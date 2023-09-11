import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { handleErrors } from "../../utils/errorHandler";

const prisma = new PrismaClient();

// GET /api/posts/[postId] get a post by id
export async function GET(
  request: NextRequest,
  { params }: { params: { postId: string } }
): Promise<NextResponse> {
  try {
    const postId = params.postId;
    const post = await prisma.post.findUnique({
      where: {
        id: parseInt(postId),
      },
    });

    if (!post) {
      return new NextResponse("Post not found", { status: 404 });
    }

    return new NextResponse(JSON.stringify(post));
  } catch (error) {
    return handleErrors(error);
  }
}

// PUT /api/posts/[postId] update a specific post by ID
export async function PUT(
  request: NextRequest,
  { params }: { params: { postId: string } }
): Promise<NextResponse> {
  try {
    const postId = params.postId;
    const updateData = await request.json();

    const updatedPost = await prisma.post.update({
      where: {
        id: parseInt(postId),
      },
      data: updateData,
    });

    return new NextResponse(JSON.stringify(updatedPost), { status: 200 });
  } catch (error) {
    return handleErrors(error);
  }
}

// DELETE /api/posts/[postId] delete a specific post by ID
export async function DELETE(
  request: NextRequest,
  { params }: { params: { postId: string } }
): Promise<NextResponse> {
  try {
    const postId = params.postId;

    await prisma.post.delete({
      where: {
        id: parseInt(postId),
      },
    });

    return new NextResponse("Post deleted successfully", { status: 200 });
  } catch (error) {
    return handleErrors(error);
  }
}
