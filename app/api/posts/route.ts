import { NextRequest, NextResponse } from "next/server";
import { handleErrors } from "../utils/errorHandler";
import prisma from "@/utils/prisma";
import { getRandomGradient } from "../utils/randomGradient";

// TO DO LATER: Gradients ONLY for TEXT type
// POST /api/posts create a new post
export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const postData = await request.json();
    const gradient = getRandomGradient();
    const newPost = await prisma.post.create({
      data: {
        ...postData,
        gradient,
      },
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
