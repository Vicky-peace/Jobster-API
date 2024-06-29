import { Context } from "hono";
import { registerUserService } from "./auth.service";

export const registerUser = async (c: Context) => {
    try {
        const user = await c.req.json();
        const message = await registerUserService(user);
        return c.json({message});
    } catch (error: any) {
        return c.json({error: error.message}, 400);
    }
}

