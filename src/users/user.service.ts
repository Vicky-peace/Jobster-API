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

export const updateUserService = async (id: number, user: TIUser) => {
    await db.update(Users).set(user).where(eq(Users.id, id)).execute();
    return "User updated successfully"
}

export const deleteUserService = async (id: number) => {
    await db.delete(Users).where(eq(Users.id, id));
    return "User deleted successfully"
}