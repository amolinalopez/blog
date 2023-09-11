import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { NextRequest, NextResponse as NextResponseReq } from "next/server";

const prisma = new PrismaClient();

// POST /api/users create a new user
export async function POST(request: NextRequest): Promise<NextResponseReq> {
  try {
    const userData = await request.json();
    const newUser = await prisma.user.create({
      data: userData,
    });
    return new NextResponse(JSON.stringify(newUser), { status: 201 });
  } catch (error) {
    if (error instanceof Error) {
      return new NextResponse(`Error message: ${error.message}`, {
        status: 500,
      });
    } else {
      return new NextResponse("An unknown error occurred.", { status: 500 });
    }
  }
}

// GET /api/users all users
export async function GET(request: NextRequest): Promise<NextResponseReq> {
  try {
    const users = await prisma.user.findMany();
    return new NextResponse(JSON.stringify(users), { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return new NextResponse(`Error message: ${error.message}`, {
        status: 500,
      });
    } else {
      return new NextResponse("An unknown error occurred.", { status: 500 });
    }
  }
}
