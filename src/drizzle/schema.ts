import { relations } from "drizzle-orm";
import { pgTable, serial, varchar, integer, timestamp, pgEnum } from "drizzle-orm/pg-core";

// User Table
export const Users = pgTable('users', {
    id: serial("id").primaryKey(),
    firstName: varchar("first_name", { length: 255 }).notNull(),
    lastName: varchar("last_name", { length: 255 }).notNull(),
    email: varchar("email", { length: 255 }).notNull(),
    password: varchar("password", { length: 255 }).notNull(),
});

// ApplicationStatus Enum
export const ApplicationStatus = pgEnum("application_status", ["pending", "scheduled", "declined", "interviewed"]);

// JobType Enum
export const JobType = pgEnum("job_type", ["full-time", "part-time", "remote", "internship"]);

// Jobs Table
export const Jobs = pgTable('jobs', {
    id: serial("id").primaryKey(),
    user_id: integer("user_id").references(() => Users.id, { onDelete: "cascade" }),
    position: varchar("position", { length: 255 }).notNull(),
    company: varchar("company", { length: 255 }).notNull(),
    location: varchar("location", { length: 255 }).notNull(),
    status: ApplicationStatus("status").default("pending"),
    job_type: JobType("job_type").default("full-time")
});

// User Relationships
export const userRelations = relations(Users, ({ many }) => ({
jobs: many(Jobs),   
}));

// Job Relationships
export const jobRelations = relations(Jobs, ({ one }) => ({
    user: one(Users, {
        fields: [Jobs.user_id],
        references: [Users.id]
    })
}));

/////////////////////////////// Types ///////////////////////////////

export type TIUser = typeof Users.$inferInsert;
export type TSUser = typeof Users.$inferSelect;
export type TIJob = typeof Jobs.$inferInsert;
export type TSJob = typeof Jobs.$inferSelect;