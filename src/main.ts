import { Hono } from "hono";
import "dotenv/config";
import { serve } from '@hono/node-server';
import { html } from 'hono/html';
import { jobRouter } from "./jobs/jobs.router";

//routes
import { authRouter } from './auth/auth.router';
import { userRouter } from "./users/user.route";
const app = new Hono();

app.get("/", async (c) => {
   const htmlContent = html`
      <!DOCTYPE html>
      <html lang="en">
      <head>
         <meta charset="UTF-8">
         <meta name="viewport" content="width=device-width, initial-scale=1.0">
         <title>Applify API</title>
         <style>
            body {
               font-family: Arial, sans-serif;
               text-align: center;
               margin: 50px;
            }
            a {
               display: block;
               margin: 10px 0;
               color: blue;
               text-decoration: none;
            }
         </style>
      </head>
      <body>
         <h1>Welcome to Applify API</h1>
         <p>You can fetch the following resources:</p>
         <a href="/users">Fetch Users</a>
         <a href="/jobs">Fetch Jobs</a>
      </body>
      </html>
   `;
   c.html(htmlContent);
});

app.route('/jobs', jobRouter);
app.route('/auth', authRouter);
app.route('/users', userRouter);

serve({
    fetch: app.fetch,
    port: Number(process.env.PORT)
});

console.log(`Server is running on http://localhost:${process.env.PORT}`);
