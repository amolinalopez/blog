import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { handleErrors } from "../../utils/errorHandler";

const prisma = new PrismaClient();

// GET  get likes by postId
export async function GET(
  request: NextRequest,
  { params }: { params: { postId: string } }
): Promise<NextResponse> {
  try {
    const likes = await prisma.like.findMany({
      where: {
        postId: parseInt(params.postId),
      },
    });

    return new NextResponse(JSON.stringify(likes));
  } catch (error) {
    return handleErrors(error);
  }
}

// DELETE a like by its ID
export async function DELETE(
  request: NextRequest,
  { params }: { params: { postId: string } }
): Promise<NextResponse> {
  try {
    await prisma.like.delete({
      where: {
        id: parseInt(params.postId),
      },
    });

    return new NextResponse("Like deleted successfully", { status: 200 });
  } catch (error) {
    return handleErrors(error);
  }
}
