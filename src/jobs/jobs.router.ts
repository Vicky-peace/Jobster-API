import { Hono } from "hono";
import { createJob, deleteJob, getJob, getJobs, updateJob } from "./jobs.controller";
import { zValidator } from "@hono/zod-validator";
import { JobSchema } from "../validator";


export const jobRouter = new Hono();

jobRouter.get('/jobs', getJobs)
jobRouter.get('/jobs/:id', getJob )
jobRouter.post("/jobs", zValidator("json", JobSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400);
    }
}), createJob);
jobRouter.put('/jobs/:id', updateJob)
jobRouter.delete("/jobs/:id", deleteJob)