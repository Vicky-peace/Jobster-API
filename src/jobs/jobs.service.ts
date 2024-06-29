import { db } from '../drizzle/db';
import { eq } from 'drizzle-orm';
import {   Jobs, TIJob, TSJob } from '../drizzle/schema';

export const getJobsService = async(): Promise<TSJob[] | null> => {
  const jobsData = await db.select().from(Jobs);
  return jobsData
   
}

export const getJobService = async (id: number): Promise<TSJob | undefined> => {
    const JobData = await db.select().from(Jobs).where(eq(Jobs.id, id)).execute();
    if (JobData.length === 0) {
        return undefined;
    }
    return JobData[0];
};

export const createJobService = async (book: TIJob) => {
    await db.insert(Jobs).values(book).execute();
    return "Book created successfully";
};


export const updateJobService = async (id: number, book: TIJob) => {
    await db.update(Jobs).set(book).where(eq(Jobs.id, id)).execute();
    return "Jobs updated successfully";
};


export const deleteJobService = async (id: number) => {
    await db.delete(Jobs).where(eq(Jobs.id, id)).execute();
    return "Jobs deleted successfully";
};




