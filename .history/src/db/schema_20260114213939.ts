import { pgTable, uuid } from "drizzle-orm/pg-core";
import { text } from "stream/consumers";

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  clerkId: text("clerk_id").unique().notNull(),
});
