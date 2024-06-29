import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { db } from '../drizzle/db';
import { TIUser, TSUser, Users } from '../drizzle/schema';
import { UserSchema,loginSchema } from '../validator';
import { eq } from 'drizzle-orm';
import { Context } from 'hono';


interface LoginResponse {
    token: string;
    user: {
        id: number;
        firstName: string;
        lastName: string;
        email: string;
        password: string;
    };
}
const secret = process.env.SECRET;
const expiresIn = process.env.EXPIRESIN;


export const registerUserService = async (user: TIUser) => {
UserSchema.parse(user);
try {
       //check if user already exists
const existingUser = await db.select().from(Users).where(eq(Users.email, user.email)).execute();

if(existingUser.length > 0) {
    throw new Error('User already exists');
}
//hash password
const hashedPassword = await bcrypt.hash(user.password, 10);

//insert user
await db.insert(Users)
.values({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    password: hashedPassword
})

.returning({id: Users.id})
.execute();     

return 'User registered successfully';
    
} catch (error) {
   console.log('Error in registerUserService', error);
}
};


export const loginUserService = async (email: string, password: string): Promise<LoginResponse>  => {
//validate input
loginSchema.parse({email, password});
try {
    const user = await db.query.Users.findFirst({
        where: eq(Users.email, email),
    })
    if(!user){
        throw new Error('User does not exist');
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if(!isPasswordValid){
        throw new Error('Invalid password');
    }

    const token = jwt.sign({id: user.id, email: user.email}, secret!, {expiresIn});
    return {token, user};
} catch (error:any) {
    console.log('Error in loginUserService', error);
    throw new Error(error.message);
}

}