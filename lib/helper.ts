import "server-only";

import "server-only";
import { SignJWT, jwtVerify } from "jose";
import { env } from "@/env";

const secret = new TextEncoder().encode(env.JOSE_TOKEN);

export async function signToken(payload: { id: number; email: string }) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secret);
}

export async function verifyToken(token: string) {
  return await jwtVerify(token, secret);
}
