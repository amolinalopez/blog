import prisma from "@/utils/prisma";
import { NextRequest, NextResponse } from "next/server";
import { handleErrors } from "../utils/errorHandler";

// GET /api/users get all users
export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        username: true,
        profilePicture: true,
      },
    });
    return new NextResponse(JSON.stringify(users), { status: 200 });
  } catch (error) {
    return handleErrors(error);
  }
}
