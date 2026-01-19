import express from 'express';
import { register, loginUser ,getUserProfile,updateUserProfile} from '../Controller/AuthController.js';
import AuthMiddleware from '../middlewares/AuthMiddlewares.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', loginUser);
router.get('/profile', AuthMiddleware, getUserProfile);
router.put('/profile', AuthMiddleware, updateUserProfile);

export default router;
