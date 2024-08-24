import mongoose from "mongoose";

import { regex } from "../utils/Regex.js";
import { paginate } from "../utils/Pagination.js";
import TrainingLog from '../models/TrainingLog.js';
import Animal from '../models/Animal.js';

export const createTraining = async (req, res) => {
    const { date, description, hours, animal, trainingLogVideo } = req.body;
    const user = req.user._id;

    if (!date || !description || !hours || !animal || !user) {
        return res.status(400).json({ message: 'Please fill in all required fields date, description, hours, animal' });
    }

    if (!regex.date.test(date)) {
        return res.status(400).json({ message: 'Invalid date' });
    }
    if (!regex.number.test(hours)) {
        return res.status(400).json({ message: 'Invalid hours' });
    }
    if (!regex.id.test(animal)) {
        return res.status(400).json({ message: 'Invalid animal' });
    }

    const newTraining = new TrainingLog({
        _id: new mongoose.Types.ObjectId(),
        date,
        description,
        hours,
        animal,
        user,
        trainingLogVideo
    });

    // Need to update the hoursTrained of the animal
    const animalDoc = await Animal.findById(animal);
    if (!animalDoc) {
        return res.status(400).json({ message: 'Animal does not exist' });
    }
    if (animalDoc.owner != user) {
        return res.status(400).json({ message: 'User is not the owner of the animal' });
    }
    animalDoc.hoursTrained += parseInt(hours);

    try {
        await newTraining.save();
        await animalDoc.save();
        res.status(200).json(newTraining);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getAllTraining = async (req, res) => {
    const { page = 1, limit = 10 } = req.query; // Default to page 1 and limit 10
    try {
        const { results, total, totalPages } = await paginate(TrainingLog, {}, page, limit);
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