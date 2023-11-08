import { NextRequest, NextResponse } from "next/server";
import { handleErrors } from "../../utils/errorHandler";
import prisma from "@/utils/prisma";

// GET /api/follows/[followId] get a follow by id
export async function GET(
  request: NextRequest,
  { params }: { params: { followId: string } }
): Promise<NextResponse> {
  try {
    const followId = params.followId;
    const follow = await prisma.follow.findUnique({
      where: {
        id: parseInt(followId),
      },
    });

    if (!follow) {
      return new NextResponse("Follow relation not found", { status: 404 });
    }

    return new NextResponse(JSON.stringify(follow));
  } catch (error) {
    return handleErrors(error);
  }
}
