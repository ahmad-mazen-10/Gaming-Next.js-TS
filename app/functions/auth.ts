"use server";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/user";
import connect from "./connect";
import { cookies } from "next/headers";

const JWT_EXPIRES = 30 * 60;

export async function signup(data: any) {
  try {
    await connect();

    // Check if a user with the same email already exists
    const existingUser = await User.findOne({ email: data.email });
    if (existingUser) {
      return {
        message: "User creation failed!",
        error: "Email already exists",
      };
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    // Create the user and convert the Mongoose document to a plain object
    const user = await User.create({ ...data, password: hashedPassword });
    const userObj = user.toObject(); // Convert to plain object

    console.log(userObj);

    return { message: "User created successfully!", user: userObj };
  } catch (error: any) {
    console.error("Error during signup:", error);

    // Handle duplicate key error specifically
    if (error.code === 11000) {
      return {
        message: "User creation failed!",
        error: "Email already exists",
      };
    }

    return { message: "User creation failed!", error: error.message };
  }
}


export async function generateToken({ id }: { id: string }) {
  return jwt.sign({ id }, process.env.JWT_SECRET!!, { expiresIn: JWT_EXPIRES });
}


export const login = async (data: { email: string; password: string }) => {
  try {
    await connect();
    const cookie = await cookies();
    console.log(data);
    const user = await User.findOne({ email: data.email }).select("+password");
  
    console.log(user);
    if (!user) {
      return { error: "User not found" };
    }
    const isMatch = await bcrypt.compare(data.password, user.password);
    if (!isMatch) {
      return { error: "Incorrect email or password !" }; //not make them know if it is the password or email
    }

    const userObj = JSON.parse(JSON.stringify(user));
    
    const token = await generateToken({ id: user._id });
    console.log(token);
    cookies().set("token", token, {
      httpOnly: true,
      maxAge: JWT_EXPIRES,
      sameSite: "none",
      path: "/",
      secure: true,
    });

    return { success: "Login successful", data: userObj };
  } catch (error: any) {
    console.log(error);
    return { error: "Login failed", details: error.message };
  }
};

export async function protect() {
  const cookie = await cookies();
  const token = cookie.get("token")?.value;
  if (!token) return { error: "you are not authorized to preform this action" };

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
    if (!user) decoded;
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
