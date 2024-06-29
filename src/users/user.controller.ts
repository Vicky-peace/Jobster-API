import { Context } from "hono";
import {userService} from './user.service';

export const listUsers = async (c: Context) =>{
    try {
const limit = Number(c.req.query('limit'))

const data = await userService(limit);
if(data == null || data.length == 0) {
    return c.text('User not found', 404)
}
return c.json(data, 200)
    } catch (error: any) {
        return c.json({error: error.message}, 500)
    }
}