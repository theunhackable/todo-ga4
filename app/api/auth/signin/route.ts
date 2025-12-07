import { db } from "@/db";
import { userLoginSchema, users } from "@/db/schemas";
import { signToken } from "@/lib/helper";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { z } from "zod";

export async function POST(req: Request) {
  const body = await req.json();
  const { success, data, error } = userLoginSchema.safeParse(body);

  if (!success) {
    const flattenedErrors = error.flatten();
    return NextResponse.json({ errors: flattenedErrors }, { status: 400 });
  }

  const [existingUser] = await db
    .select()
    .from(users)
    .where(eq(users.email, data.email));
  if (!existingUser) {
    return NextResponse.json({ message: "User not found!" }, { status: 404 });
  }
  const passwordMatched = await bcrypt.compare(
    data.password,
    existingUser.password,
  );

  if (!passwordMatched) {
    return NextResponse.json({ message: "Wrong password." }, { status: 401 });
  }

  const token = await signToken({
    id: existingUser.id,
    email: existingUser.email,
  });
  const res = NextResponse.json(
    { message: "User loggedin successfully!" },
    { status: 200 },
  );

  res.cookies.set("Authorization", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });

  return res;
}
