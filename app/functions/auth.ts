"use server";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/user";
import connect from "./connect";
import { cookies } from "next/headers";

const JWT_EXPIRES = 30 * 60;

export async function signup(data: any) {
  try {
    connect();
    const hashedPassword = bcrypt.hash(data.password, 10);
    const user = await User.create({ ...data, password: hashedPassword });
    const userObj = JSON.parse(JSON.stringify(user));

    return { message: "user create successful !!" };
  } catch (error: any) {
    console.error("error :--> ", error);
    return { message: "user create failed !!", error: error.message };
  }
}

export async function generateToken({ id }: { id: string }) {
  return jwt.sign({ id }, process.env.JWT_SECRET!!, { expiresIn: JWT_EXPIRES });
}

export async function login(data: { email: string; password: string }) {
  try {
    connect();
    const user = await User.findById({ email: data.email }).select("+password");
    if (!user) {
      return { warn: "Please signup" };
    }

    const isMatch = await bcrypt.compare(data.password, user.password);
    if (!isMatch) return { error: "incorrect  email or password !" };

    const userObj = JSON.parse(JSON.stringify(user));
    const token = await generateToken({ id: user._id });

    /* you should generate the token on server , set() ->   set the token with title 'token' same JWT_EXPIRES */
    cookies().set("token", token, {
      httpOnly: true,
      maxAge: JWT_EXPIRES,
      sameSite: "strict",
      path: "/",
      secure: true,
    });

    return { message: "Login successful ", data: userObj };
  } catch (error: any) {
    console.error("error :--> ", error);
    return { message: "user not found !!", error: error.message };
  }
}

export async function protect() {
  const cookie = await cookies();
  const token = cookie.get("token")?.value;
  if (!token)
    return { error: "you are not authorized to preform this action" };

  let decoded = jwt.verify(token, process.env.JWT_SECRET!!);
  if (!decoded)
    return { error: "you are not authorized to preform this action" };

  return { decoded };
}

export async function getUser() {
  try {
    connect();
    const { decoded } = await protect();
    const user = await User.findById((decoded as any).id);
    if (!user)decoded;
      return { error: "you are not authorized to preform this action" };

    const userObj = JSON.parse(JSON.stringify(user));
    return { data: userObj };

  } catch (error) {
    return { error: "you are not authorized to preform this action" };
  }
}

export async function logout() {
  try {
    (await cookies()).delete("token");
    return { success: "Logout successful" };
  } catch (error) {
    return { error: "Logout failed" };
  }
}
