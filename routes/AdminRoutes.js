import express from 'express';

import { getAllUsers } from '../controllers/UserController.js';
import { getAllAnimals } from '../controllers/AnimalController.js';
import { getAllTraining } from '../controllers/TrainingController.js';
import { authenticate } from '../utils/Authenticate.js';

const router = express.Router();
router.get('/users', authenticate, getAllUsers);
router.get('/animals', authenticate, getAllAnimals);
router.get('/training', authenticate, getAllTraining);

export default router;