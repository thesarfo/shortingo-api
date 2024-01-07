import bcrypt from "bcrypt"
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';

dotenv.config();

import User, { IUser } from '../models/userModel';
import urlModel, { IURL } from "../models/urlModel";

export const createUser = async ( req: Request, res: Response) => {
    const { username, email, password }: { username: string, email: string, password: string} = req.body;

    try {
        if (!( email && password && username )){
            res.status(400).json("You cant leave a field empty")
        }

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(409).json({"message": "User Already Exists, try Logging In"});
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const newUser: IUser = new User({
            username,
            email,
            password: hashedPassword
        });

        const savedUser: IUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch(error: any) {
        res.status(500).json({
            message: "Failed to create user",
            error: error.message
        });
    }
};

export const loginUser = async (req: Request, res: Response) => {
    const { email, password }: { email: string, password: string } = req.body; 

    try {
        if (!( email && password)){
            return res.status(400).json({"message": "You can't leave a field empty"});
        }

        const foundUser: IUser | null = await User.findOne({ email }).lean();
        if (!foundUser){
            return res.status(400).json({"message": "User not found or credentials are incorrect"})
        }

        const passwordMatch = await bcrypt.compare(password, foundUser.password);

        if (passwordMatch) {
            const secretKey: string | undefined = process.env.SECRET_KEY;
            if (!secretKey) {
                return res.status(500).json({ "message": "Internal Server Error. Secret key is missing or invalid." });
            }

            const token = jwt.sign({
                userId: foundUser._id,
                email: foundUser.email
            }, secretKey, { expiresIn: "1h" });

            return res.status(200).json({ 
                "message": "Login Successful",
                "userId": foundUser._id,
                "email": foundUser.email,
                "username": foundUser.username,
                "token": token
            });
        } else {
            return res.status(401).json("Invalid credentials");
        }
    } catch(error: any){
        res.status(500).json({
            message: "Failed to login user",
            error: error.message
        });
    }
}

export const getUserURLs = async (req: Request, res: Response) => {
    const { id: userId } = req.params;

    try {
        const userURLs: IURL[] = await urlModel.find({ user: userId });
        res.status(200).json(userURLs);
    } catch (error: any) {
        res.status(500).json({
            message: "Failed to fetch user's URLs",
            error: error.message
        });
    }
};