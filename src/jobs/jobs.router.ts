import { Hono } from "hono";
import { getJobs } from "./jobs.controller";


export const jobRouter = new Hono();

jobRouter.get('/jobs', getJobs)