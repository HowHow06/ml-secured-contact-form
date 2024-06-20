import express from 'express';
import authController from 'src/controllers/authController';

const router = express.Router();

router.post('/signup', authController.signup);

export default router;
