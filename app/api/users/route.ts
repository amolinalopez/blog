import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { handleErrors } from "../utils/errorHandler";

const prisma = new PrismaClient();

// POST /api/users create a new user
export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const userData = await request.json();
    const newUser = await prisma.user.create({
      data: userData,
    });
    return new NextResponse(JSON.stringify(newUser), { status: 201 });
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
