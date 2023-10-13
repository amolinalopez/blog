import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const prisma = new PrismaClient();

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const { username, password } = await request.json();
    const user = await prisma.user.findUnique({ where: { username } });

    if (!user) {
      return new NextResponse(JSON.stringify({ error: "User not found" }), {
        status: 404,
      });
    }

    const passwordValid = await bcrypt.compare(password, user.password);

    if (!passwordValid) {
      return new NextResponse(JSON.stringify({ error: "Invalid password" }), {
        status: 401,
      });
    }

    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined");
    }

    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET!,
      { expiresIn: "1h" }
    );

    cookies().set("jwtToken", token, { httpOnly: true, secure: true });

    return new NextResponse(JSON.stringify({ token }), { status: 200 });
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: `An error occurred: ${error}` }),
      { status: 500 }
    );
  }
}
