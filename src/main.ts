import { Hono } from "hono";
import "dotenv/config";
import { Context } from "hono";
import {serve} from '@hono/node-server';
import { jobRouter } from "./jobs/jobs.router";

//routes
import { authRouter } from './auth/auth.router';
import { userRouter } from "./users/user.route";
const app = new Hono();


app.get("/", async (c) => {
   c.text("Hello World");
});
app.route('/', jobRouter)


app.route('/', authRouter )
app.route('/', userRouter)


serve({
    fetch: app.fetch,
    port:Number(process.env.PORT)
})
console.log(`Server is running on http://localhost:${process.env.PORT}`)