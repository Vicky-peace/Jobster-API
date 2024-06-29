import { Context } from "hono";
import { registerUserService,loginUserService } from "./auth.service";

export const registerUser = async (c: Context) => {
    try {
        const user = await c.req.json();
        const message = await registerUserService(user);
        return c.json({message});
    } catch (error: any) {
        return c.json({error: error.message}, 400);
    }
}

export const loginUser = async (c: Context) => {
    try {
        const {email, password} = await c.req.json();
        const {token, user} = await loginUserService(email, password);
        return c.json({token, user}, 200);
    } catch (error: any){
        return c.json({error: error.message}, 400);
    }
}