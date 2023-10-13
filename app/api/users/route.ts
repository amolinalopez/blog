import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { handleErrors } from "../utils/errorHandler";
import { validateUserData } from "../utils/ValidateUserData";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

// POST /api/users create a new user
export async function POST(request: NextRequest): Promise<NextResponse> {
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

    const token = jwt.sign(
      { id: newUser.id, username: newUser.username },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    return new NextResponse(JSON.stringify({ user: newUser, token }), {
      status: 201,
    });
  } catch (error) {
    return handleErrors(error);
  }
}

// GET /api/users get all users
export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const users = await prisma.user.findMany();
    return new NextResponse(JSON.stringify(users), { status: 200 });
  } catch (error) {
    return handleErrors(error);
  }
}
