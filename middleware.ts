import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/helper";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("Authorization")?.value;
  if (!token) return NextResponse.redirect(new URL("/login", request.url));

  try {
    await verifyToken(token);
    return NextResponse.next();
  } catch (error: unknown) {
    console.error(error);
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: [
    "/",
    "/api/todos/:path*",
    "/api/users/:path*",
    "/todos/:path*",
    "/users/:path*",
  ],
}; // Protect specific routes
