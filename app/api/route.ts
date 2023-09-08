import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';
import { NextRequest, NextResponse as NextResponseReq } from 'next/server';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  if (request.method === 'GET') {
    try {
      // Fetch data from your database using Prisma
      const users = await prisma.user.findMany();

      // Return the data as a JSON response with a 200 status code
      return new NextResponse(JSON.stringify(users), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (error) {
      // Handle errors and return a 500 status code with an error message
      return new NextResponse(
        JSON.stringify({ error: 'Internal Server Error' }),
        {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }
  } else {
    // Return a 405 Method Not Allowed response for unsupported HTTP methods
    return new NextResponse(
      JSON.stringify({ error: 'Method Not Allowed' }),
      {
        status: 405,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
