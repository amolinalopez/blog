import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { handleErrors } from "../utils/errorHandler";

const prisma = new PrismaClient();

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
    const comments = await prisma.comment.findMany();
    return new NextResponse(JSON.stringify(comments), { status: 200 });
  } catch (error) {
    return handleErrors(error);
  }
}
