import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { handleErrors } from "../../utils/errorHandler";

// POST /api/users/login
export async function POST(request: NextRequest): Promise<NextResponse> {
  const cookieStore = cookies();
  const existingToken = cookieStore.get("token");

  try {
    const { username, password } = await request.json();
    if (!username || !password) {
      return new NextResponse(
        JSON.stringify({ error: "Missing username or password" }),
        { status: 400 }
      );
    }
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

    const sanitizedUser = {
      id: user.id,
      username: user.username,
      email: user.email,
      profilePicture: user.profilePicture,
    };

    // // Include the user data along with the token
    // return new NextResponse(JSON.stringify({ token, user }), {
    return new NextResponse(JSON.stringify({ token, user: sanitizedUser }), {
      status: 200,
      headers: {
        "Set-Cookie": `token=${token}; HttpOnly; Path=/; Max-Age=3600; Secure; SameSite=Lax`,
      },
    });
  } catch (error) {
    console.error(error);
    return handleErrors(error);
  }
}
