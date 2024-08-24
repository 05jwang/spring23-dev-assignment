import express from 'express';

import { authenticate } from '../utils/Authenticate.js';
import { createTraining } from '../controllers/TrainingController.js';

const router = express.Router();

router.post('/training', authenticate, createTraining);

export default router;