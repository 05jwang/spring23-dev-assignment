import mongoose from "mongoose";

const trainingSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    date: { type: Date, required: true },
    description: { type: String, required: true },
    hours: { type: Number, required: true },
    animal: { type: mongoose.Schema.Types.ObjectId, ref: 'Animal', required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    trainingLogVideo: { type: String, required: false }
});

export default mongoose.model('TrainingLog', trainingSchema);