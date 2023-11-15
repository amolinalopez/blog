import { NextResponse, NextRequest } from "next/server";

export const config = {
  matcher: [
    "/grimoire/:path*",
    "/create_post/:path*",
    "/profil/:path*",
    "/api/posts/:path*",
    "/api/comments/:path*",
    "/api/likes/:path*",
    "/api/follows/:path*",
    "/api/users/:path*",
  ],
};

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token");

  // Allow unauthenticated access to login and signup routes
  const allowedPaths = ["/api/users/login", "/api/users/signup"];
  if (allowedPaths.includes(request.nextUrl.pathname)) {
    return NextResponse.next();
  }

  // Check if the request is for an API route
  if (request.nextUrl.pathname.startsWith("/api/")) {
    if (!token) {
      // Return a JSON response for unauthorized access in API routes
      return new NextResponse(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
  } else {
    // Redirect to login page if not authenticated for non-API routes
    if (!token && request.nextUrl.pathname !== "/auth/login") {
      console.error("You are not logged in");
      const port = process.env.NODE_ENV === "development" ? ":3000" : "";
      const baseUrl = `${request.nextUrl.protocol}//${request.nextUrl.hostname}${port}`;
      return NextResponse.redirect(`${baseUrl}/auth/login`, { status: 302 });
    }
  }

  // Proceed with the request if authenticated
  return NextResponse.next();
}
