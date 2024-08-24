import mongoose from "mongoose";

import { regex } from "../utils/Regex.js";
import { paginate } from "../utils/Pagination.js";
import Animal from "../models/Animal.js";
export const createAnimal = async (req, res) => {
    const { name, hoursTrained, dateOfBirth, profilePicture } = req.body;
    const owner = req.user._id;

    if (!name || !hoursTrained || !owner || !dateOfBirth) {
        return res.status(400).json({
            message: "Please fill in all required fields name, hoursTrained, dateOfBirth",
        });
    }
    if (!regex.name.test(name)) {
        return res.status(400).json({
            message: "Invalid name",
        });
    }
    if (!regex.number.test(hoursTrained)) {
        return res.status(400).json({
            message: "Invalid hoursTrained",
        });
    }
    if (!regex.date.test(dateOfBirth)) {
        return res.status(400).json({
            message: "Invalid dateOfBirth",
        });
    }
    if (profilePicture && !regex.url.test(profilePicture)) {
        return res.status(400).json({
            message: "Invalid profilePicture",
        });
    }

    const newAnimal = new Animal({
        _id: new mongoose.Types.ObjectId(),
        name,
        hoursTrained,
        owner,
        dateOfBirth,
        profilePicture,
    });
    try {
        await newAnimal.save();
        res.status(200).json(newAnimal);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

export const getAllAnimals = async (req, res) => {
    const { page = 1, limit = 10 } = req.query;
    try {
        const { results, total, totalPages } = await paginate(Animal, {}, page, limit);
        res.status(200).json({
            results,
            total,
            totalPages,
            page
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
