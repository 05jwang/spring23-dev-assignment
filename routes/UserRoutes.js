import express from 'express';

import { authenticate } from '../utils/Authenticate.js';
import { createUser, loginUser, verifyUser } from '../controllers/UserController.js';

const router = express.Router();

router.post('/user', createUser);
router.post('/user/login', loginUser);
router.post('/user/verify', verifyUser);

export default router;