import { NextResponse, NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import "dotenv/config";

export const config = {
  matcher: "/:path*",
};

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const authorization = request.headers.get("Authorization");

  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined");
  }
  // List des routes that don't require authentication
  const openRoutes = ["/auth/signup", "/auth/login"];
  if (openRoutes.includes(pathname)) {
    return NextResponse.next();
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
