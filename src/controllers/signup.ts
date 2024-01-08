import bcrypt from "bcrypt";
import { Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();

import User, { IUser } from "../models/user";

export const createUser = async (req: Request, res: Response) => {
  const {
    username,
    email,
    password,
  }: { username: string; email: string; password: string } = req.body;

  try {
    if (!(email && password && username)) {
      res.status(400).json("You cant leave a field empty");
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res
        .status(409)
        .json({ message: "User Already Exists, try Logging In" });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser: IUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    const savedUser: IUser = await newUser.save();
    res.status(201).json({
        message: "Sign Up Successful",
        username: savedUser.username,
        email: savedUser.email,
        createdAt: savedUser.createdAt,
    });
  } catch (error: any) {
    res.status(500).json({
      message: "Sign Up Unsuccessful",
      error: error.message,
    });
  }
};