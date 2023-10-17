import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const cookieStore = cookies();
    const existingToken = cookieStore.get("token");

    if (!existingToken) {
      console.error("You are not logged iiiiiiin");
      return NextResponse.redirect("/auth/login", { status: 302 });
    }

    return new NextResponse(
      JSON.stringify({ message: "Logged out successfully" }),
      {
        status: 200,
        headers: {
          "Set-Cookie": "token=; Max-Age=0; Path=/; HttpOnly;",
        },
      }
    );
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: `An error occurred: ${error}` }),
      { status: 500 }
    );
  }
}
