import express from 'express';

import { authenticate } from '../utils/Authenticate.js';
import { createAnimal } from '../controllers/AnimalController.js';

const router = express.Router();

router.post('/animal', authenticate, createAnimal);

export default router;