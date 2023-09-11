import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

// GET /api/users/[userId] get a user by id
export async function GET(
  request: NextRequest,
  { params }: { params: { userId: string } }
): Promise<NextResponse> {
  try {
    const userId = params.userId;
    const user = await prisma.user.findUnique({
      where: {
        id: parseInt(userId),
      },
    });

    if (!user) {
      return new NextResponse("User not found", { status: 404 });
    }

    return new NextResponse(JSON.stringify(user));
  } catch (error) {
    if (error instanceof Error) {
      return new NextResponse(`Error: ${error.message}`, { status: 500 });
    } else {
      return new NextResponse("An unknown error occurred.", { status: 500 });
    }
  }
}

// PUT /api/users/[userId] update a specific user by ID
export async function PUT(
  request: NextRequest,
  { params }: { params: { userId: string } }
): Promise<NextResponse> {
  try {
    const userId = params.userId;
    const updateData = await request.json();

    const updatedUser = await prisma.user.update({
      where: {
        id: parseInt(userId),
      },
      data: updateData,
    });

    return new NextResponse(JSON.stringify(updatedUser), { status: 200 });
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

// DELETE /api/users/[userId] delete a specific user by ID
export async function DELETE(
  request: NextRequest,
  { params }: { params: { userId: string } }
): Promise<NextResponse> {
  try {
    const userId = params.userId;

    await prisma.user.delete({
      where: {
        id: parseInt(userId),
      },
    });

    return new NextResponse("User deleted successfully", { status: 200 });
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
