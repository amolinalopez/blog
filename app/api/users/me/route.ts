import prisma from "@/app/api/utils/prisma";
import { NextRequest, NextResponse } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";
import { handleErrors } from "../../utils/errorHandler";
import { cookies } from "next/headers";

export async function GET(request: NextRequest): Promise<NextResponse> {
  const cookieStore = cookies();
  try {
    const tokenCookie = cookieStore.get("token");

    if (!tokenCookie) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const token = tokenCookie.value;
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new Error("JWT_SECRET is not defined");
    }

    const payload = jwt.verify(token, secret) as JwtPayload;
    if (typeof payload === "string" || !payload.id) {
      throw new Error("Invalid token payload");
    }
    const userId = payload.id;

    const user = await prisma.user.findUnique({
      where: {
        id: parseInt(userId),
      },
    });

    if (!user) {
      return new NextResponse("User not found", { status: 404 });
    }

    return new NextResponse(JSON.stringify(user));
  } catch (error) {
    console.error(error);
    return handleErrors(error);
  }
}
