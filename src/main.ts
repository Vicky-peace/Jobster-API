import { Hono } from "hono";
import "dotenv/config";
import { Context } from "hono";
import {serve} from '@hono/node-server';
import { jobRouter } from "./jobs/jobs.router";


const app = new Hono();


app.get("/", async (c) => {
   c.text("Hello World");
});

app.route('/', jobRouter)
serve({
    fetch: app.fetch,
    port:Number(process.env.PORT)
})
console.log(`Server is running on http://localhost:${process.env.PORT}`)