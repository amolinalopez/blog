import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers"; // Import the cookies function

export async function POST(_: NextRequest): Promise<NextResponse> {
  try {
    cookies().delete('jwtToken');

    return new NextResponse(JSON.stringify({ message: "Logged out successfully" }), {
      status: 200,
    });
  } catch (error) {
    return new NextResponse(`An error occurred: ${error}`, { status: 500 });
  }
}
