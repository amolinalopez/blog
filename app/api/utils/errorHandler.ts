import { NextResponse } from "next/server";

export function handleErrors(error: any): NextResponse {
  if (error instanceof Error) {
    return new NextResponse(`Error: ${error.message}`, { status: 500 });
  } else {
    return new NextResponse("An unknown error occurred.", { status: 500 });
  }
}
