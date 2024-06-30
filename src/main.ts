import { Hono } from "hono";
import "dotenv/config";
import { serve } from '@hono/node-server';
import { html } from 'hono/html';
import { jobRouter } from "./jobs/jobs.router";
import { Context } from "hono";

//routes
import { authRouter } from './auth/auth.router';
import { userRouter } from "./users/user.route";

const app = new Hono();

app.get('/', (c: Context) => {    
    return c.html(
        html`
        <style>
            body, html {
                height: 100%;
                margin: 0;
                display: flex;
                justify-content: center;
                align-items: center;
                font-family: Arial, sans-serif;
            }
            .container {
                text-align: center;
                border: 1px solid #ddd;
                padding: 20px;
                border-radius: 8px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }
            ul {
                list-style-type: none;
                padding: 0;
            }
            li {
                margin-bottom: 10px;
            }
            a {
                color: #007BFF;
                text-decoration: none;
            }
            a:hover {
                text-decoration: underline;
            }
        </style>
        <div class="container">
            <h1>Welcome to the Applify API</h1>
            <ul>
                <li><b>Authors:</b> Charity Jelimo && Victor Peace</li>
                <li><b>Description:</b> This is a simple API for an application to track job applications</li>
                <li><b>GitHub:</b> <a href="https://github.com/jelimo-charity/Jobster-Api">GitHub link</a></li>
               
            </ul>
        </div>
        `
    );
});

app.route('/', jobRouter);
app.route('/', authRouter);
app.route('/', userRouter);

serve({
    fetch: app.fetch,
    port: Number(process.env.PORT)
});

console.log(`Server is running on http://localhost:${process.env.PORT}`);
