import { UserInsertType } from "@/db/schemas";
import { clsx, type ClassValue } from "clsx";
import { SignJWT } from "jose";
import { NextResponse } from "next/server";
import { env } from "process";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function signJwt(user: UserInsertType) {
  const textEncoder = new TextEncoder();
  user.passwordHash = "";

  const jwt = await new SignJWT({ email: user.email })
    .setExpirationTime("24h")
    .sign(textEncoder.encode(env.JOSE_TOKEN));

  const response = NextResponse.json({ success: true });
  response.cookies.set("auth-token", jwt, { httpOnly: true, secure: true });

  return response;
}

export async function decryptJwt() { }
