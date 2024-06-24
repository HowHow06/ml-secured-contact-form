import express from 'express';
import rateLimit from 'express-rate-limit';
import authController from 'src/controllers/authController';
import { UserLoginDto, UserRegisterDto } from 'src/dtos/userDto';
import { validateBody } from 'src/middlewares/validator';

const router = express.Router();

const signupLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 mins
  max: 5,
  message:
    'Too many signup requests from this IP, please try again after 15 minutes',
  headers: true,
});

router.post(
  '/signup',
  signupLimiter,
  validateBody(UserRegisterDto),
  authController.signup,
);
router.post('/login', validateBody(UserLoginDto), authController.login);
router.post('/logout', authController.logout);

export default router;
