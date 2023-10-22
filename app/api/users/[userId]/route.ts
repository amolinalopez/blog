import { NextRequest, NextResponse } from "next/server";
import { handleErrors } from "../../utils/errorHandler";
import prisma from "@/utils/prisma";

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
      select: {
        id: true,
        username: true,
        profilePicture: true,
        posts: {
          select: {
            id: true,
            content: true,
          },
        },
      },
    });

    if (!user) {
      return new NextResponse("User not found", { status: 404 });
    }

    return new NextResponse(JSON.stringify(user));
  } catch (error) {
    return handleErrors(error);
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
    return handleErrors(error);
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
    return handleErrors(error);
  }
}
