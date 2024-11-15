import bcrypt from "bcrypt";
import db from "../connection";
import { REGISTER, FIND_BY_EMAIL } from "./sql";

type User = {
    id: number;
    email: string;
    username: string;
};

type UserWithPassword = User & {
    password: string;
}

const register = async (
    email: string,
    username: string,
    clearTextPassword: string
): Promise<User> => {
    const password = await bcrypt.hash(clearTextPassword, 10);
    return await db.one(REGISTER, [email, username, password])
}

const login = async (
    email: string, 
    clearTextPassword: string
) => {
    const user = await findByEmail(email);
    const isValid = await bcrypt.compare(clearTextPassword, user.password);
    if(isValid) return user;
    else throw new Error("Invalid credentials provided");
}

const findByEmail = (email: string): Promise<UserWithPassword> => {
    return db.one(FIND_BY_EMAIL, [email]);
}

export default { register, login, findByEmail };