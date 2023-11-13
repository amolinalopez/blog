import { NextResponse, NextRequest } from "next/server";

// Paths I include from the middleware (config allows full regex ahah)
export const config = {
  matcher: ["/grimoire/:path*", "/create_post/:path*", "/profil/:path*"],
};

export function middleware(request: NextRequest) {
  // Extract le JWT token des cookies
  const token = request.cookies.get("token");
  if (!token) {
    console.error("You are not logged in");
    const port = process.env.NODE_ENV === "development" ? ":3000" : "";
    const baseUrl = `${request.nextUrl.protocol}//${request.nextUrl.hostname}${port}`;
    return NextResponse.redirect(`${baseUrl}/auth/login`, { status: 302 });
  }

  return NextResponse.next();
}
