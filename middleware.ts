import { NextResponse, NextRequest } from "next/server";

// Paths I exclude from the middleware (config allows full regex ahah)
export const config = {
  matcher:
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - auth/login (login route)
     * - auth/signup (signup route)
     * - / (homepage)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|auth/login|auth/signup).*)",
};

export function middleware(request: NextRequest) {
  // Extract le JWT token des cookies
  const token = request.cookies.get("token");

  // If the token doesn't exist ou path isn't one of the excluded paths, redirect to /auth/login
  if (!token) {
    console.error("You are not logged in");
    const port = process.env.NODE_ENV === "development" ? ":3000" : "";
    const baseUrl = `${request.nextUrl.protocol}//${request.nextUrl.hostname}${port}`;
    // const baseUrl = `${request.nextUrl.protocol}//${request.nextUrl.hostname}:3000`;
    return NextResponse.redirect(`${baseUrl}/auth/login`, { status: 302 });
  }

  return NextResponse.next();
}
