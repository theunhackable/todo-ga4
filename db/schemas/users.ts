import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

export const users = sqliteTable("users", {
  id: integer("id").primaryKey(),
  name: text("name").notNull(),
  age: integer("age").notNull(),
  email: text("email").unique().notNull(),
  password: text("password").notNull(),
  createdAt: text("created_at")
    .default(sql`(CURRENT_TIMESTAMP)`)
    .notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" }).$onUpdate(
    () => new Date(),
  ),
});

export const userSelectSchema = createSelectSchema(users);
export const userInsertSchema = createInsertSchema(users, {
  name: z.string().min(1),
  age: z.coerce.number().min(18).max(150),
  email: z.email(),
  password: z.string().min(8, "Password must be at least 8 characters long"),
})
  .omit({ id: true })
  .extend({
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
export const userLoginSchema = userInsertSchema.pick({
  email: true,
  password: true,
});

export type UserSelectType = z.infer<typeof userSelectSchema>;
export type UserInsertType = z.infer<typeof userInsertSchema>;
export type UserLoginType = z.infer<typeof userLoginSchema>;
