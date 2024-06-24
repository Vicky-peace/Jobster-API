import { Hono } from "hono";
import "dotenv/config";
import { Context } from "hono";
import {serve} from '@hono/node-server';


const app = new Hono();


app.get("/", async (c) => {
   c.text("Hello World");
});


serve({
    fetch: app.fetch,
    port:Number(process.env.PORT)
})
console.log(`Server is running on http://localhost:${process.env.PORT}`)