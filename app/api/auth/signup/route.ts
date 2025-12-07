import { db } from "@/db";
import { userInsertSchema, users } from "@/db/schemas";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { z } from "zod";

export async function POST(req: Request) {
  const body = await req.json();

  const { success, data, error } = userInsertSchema.safeParse(body);

  if (!success) {
    const flatenedErrors = error.flatten();
    return NextResponse.json({ errors: flatenedErrors }, { status: 400 });
  }

  const [existingUser] = await db
    .select()
    .from(users)
    .where(eq(users.email, data.email));
  if (existingUser)
    return NextResponse.json(
      { message: "User with given email already exists." },
      { status: 409 },
    );
  const hashedPassword = await bcrypt.hash(data.password, 10);
  await db.insert(users).values({
    ...data,
    password: hashedPassword,
  });

  return NextResponse.json(
    { message: "User created successfully!" },
    { status: 201 },
  );
}
