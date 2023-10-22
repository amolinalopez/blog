import { NextRequest, NextResponse } from "next/server";
import { handleErrors } from "../utils/errorHandler";
import prisma from "@/app/api/utils/prisma";

// POST /api/posts create a new post
export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const postData = await request.json();
    const newPost = await prisma.post.create({
      data: postData,
    });
    return new NextResponse(JSON.stringify(newPost), { status: 201 });
  } catch (error) {
    return handleErrors(error);
  }
}

// GET /api/posts get all posts
export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const posts = await prisma.post.findMany({
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        content: true,
        type: true,
        mediaUrl: true,
        updatedAt: true,
        userId: true,
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
            postId: true,
          },
        },
      },
    });
    return new NextResponse(JSON.stringify(posts), { status: 200 });
  } catch (error) {
    return handleErrors(error);
  }
}
