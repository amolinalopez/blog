import { NextResponse } from "next/server";

export function handleErrors(error: any): NextResponse {
  if (error instanceof Error) {
    return new NextResponse(JSON.stringify({ error: `${error.message}` }), {
      status: 500,
    });
  } else {
    return new NextResponse(
      JSON.stringify({ error: `An error occurred: ${error}` }),
      { status: 500 }
    );
  }
}
