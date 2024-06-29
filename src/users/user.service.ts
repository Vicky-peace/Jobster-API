import {db} from '../drizzle/db';
import { TIUser, TSUser,Users } from '../drizzle/schema';
import { eq } from 'drizzle-orm';
import { Context } from 'hono';


export const userService = async (limit?: number): Promise<TSUser[] | null> => {
    if(limit) {
        return await db.query.Users.findMany({
            limit: limit
        })
    }
    return await db.query.Users.findMany();
}

export const getUserService = async (id: number): Promise<TSUser | undefined> => {
    return await db.query.Users.findFirst({
        where: eq(Users.id, id) 
    })
}

