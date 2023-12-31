import prisma from "@/utils/prisma";
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
      where: { id: parseInt(userId) },
      include: {
        posts: {
          orderBy: {
            createdAt: "desc",
          },
        },
        _count: {
          select: {
            posts: true,
            followers: true,
            following: true,
          },
        },
      },
    });

    if (!user) {
      return new NextResponse("User not found", { status: 404 });
    }

    // Extract the counts from the user response
    const { _count: counts } = user;

    const { password, ...userData } = user;

    const userStats = {
      posts: counts.posts,
      followers: counts.followers,
      following: counts.following,
    };

    const responseBody = {
      user: {
        ...userData,
        posts: user.posts,
      },
      stats: userStats,
    };

    return new NextResponse(JSON.stringify(responseBody));
  } catch (error) {
    console.error(error);
    return handleErrors(error);
  }
}

export async function DELETE(request: NextRequest): Promise<NextResponse> {
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

    // Perform the deletion
    await prisma.user.delete({
      where: {
        id: parseInt(userId),
      },
    });

    // Invalidate the token after successful deletion
    cookieStore.delete("token");

    return new NextResponse("User deleted successfully", {
      status: 200,
      headers: { "Set-Cookie": "token=; Max-Age=0; path=/;" },
    });
  } catch (error) {
    console.error(error);
    return handleErrors(error);
  }
}
