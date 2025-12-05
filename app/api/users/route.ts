import { userInsertSchema } from "@/db/schemas";
import { NextResponse } from "next/server";
import z4 from "zod/v4";
import { SignJWT } from "jose";

import { env } from "@/env";
import { signJwt } from "@/lib/utils";

export async function POST(req: Request) {
  const body = await req.json();
  const { success, data, error } = userInsertSchema.safeParse(body);
  if (!success) {
    const flattenErrors = z4.flattenError(error);
    return NextResponse.json({
      message: "Invalid Data",
      errors: flattenErrors,
    });
  }
  return NextResponse.json({});
}
