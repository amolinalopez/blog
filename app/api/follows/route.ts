import { NextRequest, NextResponse } from "next/server";
import { handleErrors } from "../utils/errorHandler";
import prisma from "@/utils/prisma";

// POST /api/follows create a new follow relationship
export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const followData = await request.json();
    const newFollow = await prisma.follow.create({
      data: followData,
    });
    return new NextResponse(JSON.stringify(newFollow), { status: 201 });
  } catch (error) {
    return handleErrors(error);
  }
}
