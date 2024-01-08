import express from 'express';

import { createUser } from '../controllers/signup';
import { loginUser } from '../controllers/login';

const router = express.Router();

router.post('/register', createUser);
router.post('/login', loginUser);

export default router;