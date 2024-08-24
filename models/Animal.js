import mongoose from "mongoose";

const animalSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    hoursTrained: { type: Number, required: true },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    dateOfBirth: { type: Date, required: true },
    profilePicture: { type: String, required: false }
});

export default mongoose.model('Animal', animalSchema);