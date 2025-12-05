import z4 from "zod/v4";
const envSchema = z4.object({
  TURSO_CONNECTION_URL: z4.string(),
  TURSO_AUTH_TOKEN: z4.string(),
  JOSE_TOKEN: z4.string(),
});

type Env = z4.infer<typeof envSchema>;

const { success, data } = envSchema.safeParse(process.env);

if (!success) {
  console.error("Error parsing env");
  process.exit(1);
}

export const env = data;
