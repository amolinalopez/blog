import { NextRequest, NextResponse } from "next/server";
import { handleErrors } from "../utils/errorHandler";
import prisma from '@/app/api/utils/prisma'; 

// POST /api/comments - Create a new comment
export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const commentData = await request.json();
    const newComment = await prisma.comment.create({
      data: commentData,
    });
    return new NextResponse(JSON.stringify(newComment), { status: 201 });
  } catch (error) {
    return handleErrors(error);
  }
}

// GET /api/comments - Retrieve all comments
export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const comments = await prisma.comment.findMany({
      select: {
        id: true,
        postId: true,
        content: true,
        updatedAt: true,
        userId: true,
      },
      orderBy: {
        updatedAt: "desc",
      },
    });
    return new NextResponse(JSON.stringify(comments), { status: 200 });
  } catch (error) {
    return handleErrors(error);
  }
}
