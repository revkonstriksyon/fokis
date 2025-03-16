import { pgTable, text, serial, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  role: text("role").notNull().default("user"), // admin or user
});

export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
});

export const articles = pgTable("articles", {
  id: serial("id").primaryKey(),
  title: jsonb("title").notNull(), // {kr: string, fr: string, en: string}
  content: jsonb("content").notNull(), // {kr: string, fr: string, en: string}
  summary: jsonb("summary").notNull(), // {kr: string, fr: string, en: string}
  categoryId: integer("category_id").notNull(),
  authorId: integer("author_id").notNull(),
  published: boolean("published").notNull().default(false),
  imageUrl: text("image_url"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertArticleSchema = createInsertSchema(articles).pick({
  title: true,
  content: true,
  summary: true, 
  categoryId: true,
  imageUrl: true,
});

export const insertCategorySchema = createInsertSchema(categories);

export type InsertUser = z.infer<typeof insertUserSchema>;
export type InsertArticle = z.infer<typeof insertArticleSchema>;
export type InsertCategory = z.infer<typeof insertCategorySchema>;

export type User = typeof users.$inferSelect;
export type Article = typeof articles.$inferSelect;
export type Category = typeof categories.$inferSelect;
