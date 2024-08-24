import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';

import userRoutes from './routes/userRoutes.js';
import animalRoutes from './routes/animalRoutes.js';
import trainingRoutes from './routes/trainingRoutes.js';
import adminRoutes from './routes/adminRoutes.js';


dotenv.config();
const app = express();
const APP_PORT = 5000;

// MongoDB connection
const mongoURI = process.env.DATABASE_URI;
const userName = process.env.DATABASE_USER;
const password = process.env.DATABASE_PASSWORD;
mongoose.connect(mongoURI, {
    auth: {
        username: userName,
        password: password
    }
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('Error connecting to MongoDB:', err);
});

app.use(cors({ origin: true }));
app.use(express.json());

app.get('/api/health', (req, res) => {
    res.json({ healthy: true });
});
app.get('/', (req, res) => {
    res.send('Hello World');
});

app.use('/api', userRoutes);
app.use('/api', animalRoutes);
app.use('/api', trainingRoutes);
app.use('/api/admin', adminRoutes);

app.listen(APP_PORT, () => {
    console.log(`API listening at http://localhost:${APP_PORT}`);
});