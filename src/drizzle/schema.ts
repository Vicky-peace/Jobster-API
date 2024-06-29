import { relations } from "drizzle-orm";
import { pgTable, serial, varchar, text, integer, timestamp, pgEnum } from "drizzle-orm/pg-core";

// User Table
export const Users = pgTable('users', {
    id: serial("id").primaryKey(),
    firstName: varchar("first_name", { length: 255 }).notNull(),
    lastName: varchar("last_name", { length: 255 }).notNull(),
    email: varchar("email", { length: 255 }).notNull(),
    // location: varchar("location", { length: 255 }),
    password: varchar("password", { length: 255 }).notNull(),
    // created_at: timestamp("created_at").defaultNow(),
    // updated_at: timestamp("updated_at").defaultNow(),
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
    job_type: JobType("job_type").default("full-time"),
   
});

/////////////////////////////// Relationships ///////////////////////////////

// User Relationships
export const userRelations = relations(Users, ({ one}) => ({
    jobs: one(Jobs, {
        fields: [Users.id],
        references: [Jobs.user_id]
    })
}));

// Job Relationships
export const jobRelations = relations(Jobs, ({ many}) => ({
    user: many(Jobs)
}));

/////////////////////////////// Types ///////////////////////////////

export type TIUser = typeof Users.$inferInsert;
export type TSUser = typeof Users.$inferSelect;
export type TIJob = typeof Jobs.$inferInsert;
export type TSJob = typeof Jobs.$inferSelect;
