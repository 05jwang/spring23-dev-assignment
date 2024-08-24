import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import User from "../models/User.js";
import { paginate } from "../utils/Pagination.js";
import { regex } from "../utils/Regex.js";
export const createUser = async (req, res) => {
    const {
        firstName,
        lastName,
        email,
        password,
        profilePicture
    } = req.body;

    // console.log(req.body);

    if (!firstName || !lastName || !email || !password) {
        return res.status(400).json({
            message: 'Please fill in all required fields firstName, lastName, email, password'
        });
    }
    if (!regex.name.test(firstName)) {
        return res.status(400).json({
            message: 'Invalid firstName'
        });
    }
    if (!regex.name.test(lastName)) {
        return res.status(400).json({
            message: 'Invalid lastName'
        });
    }
    if (!regex.email.test(email)) {
        return res.status(400).json({
            message: 'Invalid email'
        });
    }
    if (!regex.password.test(password)) {
        return res.status(400).json({
            message: 'Invalid password, must contain at least 8 characters, one letter, one number and one special character'
        });
    }
    if (profilePicture && !regex.url.test(profilePicture)) {
        return res.status(400).json({
            message: 'Invalid profilePicture'
        });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(400).json({
            message: 'User already exists'
        });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    // console.log(hashedPassword);
    // return;


    const newUser = new User({
        _id: new mongoose.Types.ObjectId(),
        firstName,
        lastName,
        email,
        password: hashedPassword,
        profilePicture
    });

    try {
        await newUser.save();
        res.status(200).json(newUser);
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    if (!regex.email.test(email)) {
        return res.status(400).json({ message: 'Invalid email' });
    }
    if (!regex.password.test(password)) {
        return res.status(400).json({ message: 'Invalid password, must contain at least 8 characters, one letter, one number and one special character' });
    }
    // console.log(email, password);
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(403).json({ message: 'User not found' });
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(403).json({ message: 'Invalid password' });
        }


        res.status(200).json({ message: 'Login successful' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

}

export const verifyUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    if (!regex.email.test(email)) {
        return res.status(400).json({ message: 'Invalid email' });
    }
    if (!regex.password.test(password)) {
        return res.status(400).json({ message: 'Invalid password, must contain at least 8 characters, one letter, one number and one special character' });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(403).json({ message: 'User not found' });
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(403).json({ message: 'Invalid password' });
        }
        const token = jwt.sign({
            id: user._id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            profilePicture: user.profilePicture
        }, process.env.JWT_STRING, { expiresIn: '1h' });
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getAllUsers = async (req, res) => {
    const { page = 1, limit = 10 } = req.query; // Default to page 1 and limit 10
    try {
        const { results, total, totalPages } = await paginate(User, {}, page, limit);
        const users = results.map(user => {
            const { password, ...data } = user._doc;
            return data;
        });
        res.status(200).json({
            users,
            total,
            totalPages,
            page
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};