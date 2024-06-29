import { Hono } from "hono";
import {  registerUser  } from './auth.controller';

export const authRouter = new Hono();

authRouter.post("/register", registerUser);