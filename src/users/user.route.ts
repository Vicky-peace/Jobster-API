import { Hono } from "hono";
import {listUsers} from './user.controller';

export const userRouter = new Hono();

userRouter.get('/users', listUsers);