import { Context } from "hono";
import {  createJobService, deleteJobService, getJobService, getJobsService, updateJobService } from "./jobs.service";


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


export const getJob = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const Job = await getJobService(id);
    if (!Job) {
        return c.text("job not found", 404);
    }
    return c.json(Job, 200);
};


export const createJob = async (c: Context) => {
    try {
        const job = await c.req.json();
        const createdjob = await createJobService(job);
        if (!createdjob) return c.text("Book not created", 404);
        return c.json({ msg: createdjob }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
};

export const updateJob = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const job = await c.req.json();
    try {
        // Search for the job
        const searchedjob = await getJobService(id);
        if (searchedjob == undefined) return c.text("job not found", 404);

        // Get the data and update it
        const res = await updateJobService(id, job);
        // Return a success message
        if (!res) return c.text("job not updated", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
}


export const deleteJob = async (c: Context) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    try {
        const book = await getJobService(id);
        if (!book) return c.text("job not found", 404);
        const res = await deleteJobService(id);
        if (!res) return c.text("job not deleted", 404);
        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
};

