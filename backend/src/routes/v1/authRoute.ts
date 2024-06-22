import express from 'express';
import authController from 'src/controllers/authController';
import { UserLoginDto, UserRegisterDto } from 'src/dtos/userDto';
import { validateBody } from 'src/middlewares/validator';

const router = express.Router();

router.post('/signup', validateBody(UserRegisterDto), authController.signup);
router.post('/login', validateBody(UserLoginDto), authController.login);

export default router;
