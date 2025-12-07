import "server-only";
import z4 from "zod/v4";
const envSchema = z4.object({
  TURSO_CONNECTION_URL: z4.string(),
  TURSO_AUTH_TOKEN: z4.string(),
  JOSE_TOKEN: z4.string(),
});

const { success, data, error } = envSchema.safeParse(process.env);

if (!success) {
  console.error("Error parsing env");
  console.error("error", error);
}

export const env = data;
