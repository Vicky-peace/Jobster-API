import { z } from 'zod';

// Validation schema for Users
export const UserSchema = z.object({
    id: z.number().optional(), // ID is auto-generated and optional for new inserts
    firstName: z.string().max(255, "First name must be at most 255 characters long"),
    lastName: z.string().max(255, "Last name must be at most 255 characters long"),
    email: z.string().email("Email must be a valid email").max(255, "Email must be at most 255 characters long"),
    password: z.string().max(255, "Password must be at most 255 characters long")
});

export const loginSchema = z.object({
    email: z.string().email().max(255),
    password: z.string().max(255)
})


// Enum for ApplicationStatus
export const ApplicationStatus = z.enum(["pending", "scheduled", "declined", "interviewed"]);

// Enum for JobType
export const JobType = z.enum(["full-time", "part-time", "remote", "internship"]);

// Validation schema for Jobs
export const JobSchema = z.object({
    id: z.number().optional(), // ID is auto-generated and optional for new inserts
    user_id: z.number(), // Reference to Users ID
    position: z.string().max(255, "Position must be at most 255 characters long"),
    company: z.string().max(255, "Company must be at most 255 characters long"),
    job_location: z.string().max(255, "Job location must be at most 255 characters long"),
    status: ApplicationStatus,
    job_type: JobType
});

// Example usage of the UserSchema for validation
export const validateUser = (data: any) => {
    return UserSchema.parse(data);
};

// Example usage of the JobSchema for validation
export const validateJob = (data: any) => {
    return JobSchema.parse(data);
};
