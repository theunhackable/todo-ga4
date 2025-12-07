import { db } from "@/db";
import { users } from "@/db/schemas";
import { verifyToken } from "@/lib/helper";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const token = req.cookies.get("Authorization")?.value;
  if (!token) {
    return NextResponse.json(
      { message: "Missing auth token." },
      { status: 403 },
    );
  }
  const { payload } = await verifyToken(token);
  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.email, payload.email as string));
  if (!user) {
    return NextResponse.json({ message: "email not found" });
  }
  const { password, ...userWithoutPassword } = user;
  return NextResponse.json({ user: userWithoutPassword });
}
