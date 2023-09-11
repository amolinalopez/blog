import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { handleErrors } from "../../utils/errorHandler";

const prisma = new PrismaClient();

// GET /api/likes/post/[postId]
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
