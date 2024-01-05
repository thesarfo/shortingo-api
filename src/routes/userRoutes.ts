import express from 'express';
import {
    createUser, getUserURLs, loginUser
} from '../controllers/userController'

const router = express.Router();

router.post('/register', createUser);
router.post('/login', loginUser);
router.get('/userUrls/:id', getUserURLs);

export default router;