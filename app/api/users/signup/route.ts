import prisma from "@/utils/prisma";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { validateUserData } from "../../utils/ValidateUserData";
import { handleErrors } from "../../utils/errorHandler";

// POST /api/users create a new user
export async function POST(request: NextRequest): Promise<NextResponse> {
  const cookieStore = cookies();
  const existingToken = cookieStore.get("token");

  if (existingToken) {
    return new NextResponse(
      JSON.stringify({ error: "You are already logged in" }),
      { status: 400 }
    );
  }

  try {
    const userData = await request.json();
    const validationError = validateUserData(userData);
    if (validationError) {
      return new NextResponse(JSON.stringify({ error: validationError }), {
        status: 400,
      });
    }

    const { username, email, password } = userData;

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });

    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined");
    }

    // encodes the jwt token
    const token = jwt.sign(
      { id: newUser.id, username: newUser.username },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    return new NextResponse(JSON.stringify({ user: newUser, token }), {
      status: 201,
      headers: {
        "Set-Cookie": `token=${token}; HttpOnly; Path=/; ${
          process.env.NODE_ENV === "production" ? "Secure; " : ""
        } Max-Age=3600; Secure; SameSite=Lax`,
      },
    });
  } catch (error) {
    return handleErrors(error);
  }
}
