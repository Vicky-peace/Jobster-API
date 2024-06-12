import { relations } from "drizzle-orm";
import { pgTable, serial, varchar, text, integer, timestamp, boolean } from "drizzle-orm/pg-core";
import { pgEnum } from 'drizzle-orm/pg-core';

// User Table
export const Users = pgTable('users', {
    id: serial("id").primaryKey(),
    username: varchar("username", { length: 255 }).notNull(),
    email: varchar("email", { length: 255 }).notNull(),
    password: varchar("password", { length: 255 }).notNull(),
    created_at: timestamp("created_at").defaultNow(),
    updated_at: timestamp("updated_at").defaultNow(),
});

// Job Table
export const Jobs = pgTable('jobs', {
    id: serial("id").primaryKey(),
    title: varchar("title", { length: 255 }).notNull(),
    description: text("description").notNull(),
    company: varchar("company", { length: 255 }).notNull(),
    location: varchar("location", { length: 255 }).notNull(),
    created_at: timestamp("created_at").defaultNow(),
    updated_at: timestamp("updated_at").defaultNow(),
});

// ApplicationStatus Enum
export const ApplicationStatus = pgEnum("application_status", ["pending", "scheduled", "declined"]);

// Applications Table
export const Applications = pgTable('applications', {
    id: serial("id").primaryKey(),
    user_id: integer("user_id").references(() => Users.id, { onDelete: "cascade" }),
    job_id: integer("job_id").references(() => Jobs.id, { onDelete: "cascade" }),
    status: ApplicationStatus("status").default("pending"),
    created_at: timestamp("created_at").defaultNow(),
    updated_at: timestamp("updated_at").defaultNow(),
});

// Interviews Table
export const Interviews = pgTable('interviews', {
    id: serial("id").primaryKey(),
    application_id: integer("application_id").references(() => Applications.id, { onDelete: "cascade" }),
    scheduled_time: timestamp("scheduled_time").notNull(),
    created_at: timestamp("created_at").defaultNow(),
    updated_at: timestamp("updated_at").defaultNow(),
});

/////////////////////////////// Relationships ///////////////////////////////

// User Relationships
export const userRelations = relations(Users, ({ many }) => ({
    applications: many(Applications),
}));

// Job Relationships
export const jobRelations = relations(Jobs, ({ many }) => ({
    applications: many(Applications),
}));

// Application Relationships
export const applicationRelations = relations(Applications, ({ one, many }) => ({
    user: one(Users, {
        fields: [Applications.user_id],
        references: [Users.id]
    }),
    job: one(Jobs, {
        fields: [Applications.job_id],
        references: [Jobs.id]
    }),
    interviews: many(Interviews),
}));

// Interview Relationships
export const interviewRelations = relations(Interviews, ({ one }) => ({
    application: one(Applications, {
        fields: [Interviews.application_id],
        references: [Applications.id]
    })
}));

/////////////////////////////// Types ///////////////////////////////

export type TIUser = typeof Users.$inferInsert;
export type TSUser = typeof Users.$inferSelect;
export type TIJob = typeof Jobs.$inferInsert;
export type TSJob = typeof Jobs.$inferSelect;
export type TIApplication = typeof Applications.$inferInsert;
export type TSApplication = typeof Applications.$inferSelect;
export type TIInterview = typeof Interviews.$inferInsert;
export type TSInterview = typeof Interviews.$inferSelect;
