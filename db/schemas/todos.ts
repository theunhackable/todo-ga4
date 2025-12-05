import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { users } from "./users";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import z4 from "zod/v4";

export const todos = sqliteTable("todos", {
  id: integer("id").primaryKey(),
  userId: integer("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  title: text("title").notNull(),
  description: text("description"),
  done: integer({ mode: "boolean" }).default(false),
  createdAt: text("created_at")
    .default(sql`(CURRENT_TIMESTAMP)`)
    .notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" }).$onUpdate(
    () => new Date(),
  ),
});

export const todoSelectSchema = createSelectSchema(todos);
export const todoInsertSchema = createInsertSchema(todos).omit({ id: true });

export type TodoelectType = z4.infer<typeof todoSelectSchema>;
export type TodoInsertType = z4.infer<typeof todoInsertSchema>;
