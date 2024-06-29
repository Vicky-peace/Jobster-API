import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { db } from '../drizzle/db';
import { TIUser, TSUser, Users } from '../drizzle/schema';
import { eq } from 'drizzle-orm';


const secret = process.env.SECRET;
const expiresIn = process.env.EXPIRESIN;


