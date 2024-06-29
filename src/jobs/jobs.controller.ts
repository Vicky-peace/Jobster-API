import { Context } from "hono";
import {  getJobsService } from "./jobs.service";


export const getJobs = async(c: Context) => {
    try {
        const data = await getJobsService();
        if(!data || data.length === 0) { 
            return c.text("Job not found")
        }
        return c.json(data, 200)
    } catch (error: any) {
        return c.json({error: error.message}, 400)
    }
}