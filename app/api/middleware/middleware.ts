import { NextResponse, NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import "dotenv/config";

export const config = {
  matcher: "/protected/:path*",
};

export function middleware(request: NextRequest) {
  const authorization = request.headers.get("Authorization");

  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined");
  }

  try {
    if (!authorization) throw new Error("No token provided");

    const token = authorization.replace("Bearer ", "");
    jwt.verify(token, process.env.JWT_SECRET);
    return NextResponse.next();
  } catch (error) {
    return NextResponse.redirect("/auth/login");
  }
}
