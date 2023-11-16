import { NextRequest, NextResponse } from "next/server";
import { handleErrors } from "../../utils/errorHandler";
import prisma from "@/utils/prisma";

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
      select: {
        id: true,
        content: true,
        gradient: true,
        user: {
          select: {
            id: true,
            username: true,
            profilePicture: true,
          },
        },
        likes: {
          select: {
            id: true,
            userId: true,
          },
        },
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
      select: {
        id: true,
        content: true,
        gradient: true,
        createdAt: true,
        updatedAt: true,
        userId: true,
        type: true,
        mediaUrl: true,
        likes: {
          select: {
            id: true,
            userId: true,
            postId: true,
          },
        },
      },
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
