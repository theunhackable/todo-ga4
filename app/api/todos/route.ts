import { todos } from "@/data/todos";
import { TodoInputs } from "@/types";
import { NextResponse } from "next/server";

export async function GET() {
  return Response.json({ message: "from todo get" });
}

export async function POST(req: Request) {
  const formData = req.body;
  console.log(formData);
  return NextResponse.json(
    { message: "added todo", formData },
    { status: 201 },
  );
}
