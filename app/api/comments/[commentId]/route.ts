import { NextRequest, NextResponse } from "next/server";
import { handleErrors } from "../../utils/errorHandler";
import prisma from "@/app/api/utils/prisma";

// GET /api/comments/[commentId] - Retrieve a comment by ID
export async function GET(
  request: NextRequest,
  { params }: { params: { commentId: string } }
): Promise<NextResponse> {
  try {
    const commentId = params.commentId;
    const comment = await prisma.comment.findUnique({
      where: {
        id: parseInt(commentId),
      },
    });

    if (!comment) {
      return new NextResponse("Comment not found", { status: 404 });
    }

    return new NextResponse(JSON.stringify(comment));
  } catch (error) {
    return handleErrors(error);
  }
}

// PUT /api/comments/[commentId] - Update a specific comment by ID
export async function PUT(
  request: NextRequest,
  { params }: { params: { commentId: string } }
): Promise<NextResponse> {
  try {
    const commentId = params.commentId;
    const updateData = await request.json();

    const updatedComment = await prisma.comment.update({
      where: {
        id: parseInt(commentId),
      },
      data: updateData,
    });

    return new NextResponse(JSON.stringify(updatedComment), { status: 200 });
  } catch (error) {
    return handleErrors(error);
  }
}

// DELETE /api/comments/[commentId] - Delete a specific comment by ID
export async function DELETE(
  request: NextRequest,
  { params }: { params: { commentId: string } }
): Promise<NextResponse> {
  try {
    const commentId = params.commentId;

    await prisma.comment.delete({
      where: {
        id: parseInt(commentId),
      },
    });

    return new NextResponse("Comment deleted successfully", { status: 200 });
  } catch (error) {
    return handleErrors(error);
  }
}
