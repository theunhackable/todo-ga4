import { db } from "@/db";
import { todoInsertSchema, todos } from "@/db/schemas";
import { verifyToken } from "@/lib/helper";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const token = req.cookies.get("Authorization")?.value;
  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  const { payload } = await verifyToken(token);
  const userTodos = await db
    .select()
    .from(todos)
    .where(eq(todos.userId, payload.id as number));
  return NextResponse.json({ todos: userTodos });
}

export async function POST(req: NextRequest) {
  const token = req.cookies.get("Authorization")?.value;
  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  const { payload } = await verifyToken(token);
  const body = await req.json();
  const { success, data, error } = todoInsertSchema.safeParse(body);
  if (!success) {
    return NextResponse.json(
      { message: "wrong info sent while creating todo" },
      { status: 400 },
    );
  }
  await db.insert(todos).values({
    ...data,
    userId: payload.id as number,
  });
  return new Response(null, { status: 201 });
}
