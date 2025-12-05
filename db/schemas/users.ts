import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import z4 from "zod/v4";

export const users = sqliteTable("users", {
  id: integer("id").primaryKey(),
  name: text("name").notNull(),
  age: integer("age").notNull(),
  email: text("email").unique().notNull(),
  passwordHash: text("").notNull(),
  createdAt: text("created_at")
    .default(sql`(CURRENT_TIMESTAMP)`)
    .notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" }).$onUpdate(
    () => new Date(),
  ),
});

export const userSelectSchema = createSelectSchema(users);
export const userInsertSchema = createInsertSchema(users).omit({ id: true });

export type UserSelectType = z4.infer<typeof userSelectSchema>;
export type UserInsertType = z4.infer<typeof userInsertSchema>;
