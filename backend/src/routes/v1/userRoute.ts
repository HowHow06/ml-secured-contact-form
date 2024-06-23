import express from 'express';
import userController from 'src/controllers/userController';
import { UserContactFormDto } from 'src/dtos/userDto';
import authMiddleware from 'src/middlewares/authMiddleware';
import { validateBody } from 'src/middlewares/validator';

const router = express.Router();

router.post(
  '/contact-form',
  authMiddleware.authenticate,
  validateBody(UserContactFormDto),
  userController.submitContactForm,
);

export default router;
