import { NextRequest, NextResponse } from "next/server";
import { handleErrors } from "../utils/errorHandler";
import prisma from "@/utils/prisma";

// POST /api/likes
export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const { userId, postId } = await request.json();

    const newLike = await prisma.like.create({
      data: {
        userId: userId,
        postId: postId,
      },
    });

    return new NextResponse(JSON.stringify(newLike), { status: 201 });
  } catch (error) {
    return handleErrors(error);
  }
}
