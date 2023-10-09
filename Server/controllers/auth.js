
import mongoose from "mongoose";
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";

//============================================ USER SCHEMA =========================
import youtubeUser from '../models/User.js'
// ==========================================Error JS =============================
import { CreateError } from "../error.js";
import User from "../models/User.js";
//=========================================== SIGNUP USERS ============================

export const signup = async (req, res, next) => {

    try {
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(req.body.password, salt)

        const newUser = new youtubeUser({ ...req.body, password: hash })
        await newUser.save()
        res.status(200).send("User Has Been Created")
    } catch (err) {
        next(err)
    }
}

//=========================================== SIGNIN USERS ============================================//

export const signIn = async (req, res, next) => {
    try {
        const user = await youtubeUser.findOne({ name: req.body.name });
        if (!user) {
            const error = new Error("User Not Found");
            error.status = 404;
            throw error;
        }

        const isCorrect = await bcrypt.compare(req.body.password, user.password);
        if (!isCorrect) {
            const error = new Error("Wrong Credentials");
            error.status = 400;
            throw error;
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT);

        const { password, ...others } = user._doc;
        res.cookie("access_token", token, {
            httpOnly: true
        }).status(200).json(others);
    } catch (err) {
        next(err); // Pass the error to the error handling middleware
    }
};


export const googleAuth = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (user) {
            const token = jwt.sign({ id: user._id }, process.env.JWT);
            res
                .cookie("access_token", token, {
                    httpOnly: true,
                })
                .status(200)
                .json(user._doc);
        } else {
            const newUser = new User({
                ...req.body,
                fromGoogle: true,
            });
            const savedUser = await newUser.save();
            const token = jwt.sign({ id: savedUser._id }, process.env.JWT);
            res
                .cookie("access_token", token, {
                    httpOnly: true,
                })
                .status(200)
                .json(savedUser._doc);
        }
    } catch (err) {
        next(err);
    }
};







