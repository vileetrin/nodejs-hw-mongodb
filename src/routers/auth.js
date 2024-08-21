import express from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';

import {
  loginUserSchema,
  registerUserSchema,
  sendResetEmailSchema,
  resetPasswordSchema,
} from '../validations/auth.js';

import {
  logoutUserController,
  registerUserController,
  loginUserController,
  refreshUsersSessionController,
  sendResetEmailController,
  resetPasswordController,
} from '../controllers/auth.js';

const router = express.Router();
const jsonParser = express.json();

router.post(
  '/register',
  jsonParser,
  validateBody(registerUserSchema),
  ctrlWrapper(registerUserController),
);

router.post(
  '/login',
  jsonParser,
  validateBody(loginUserSchema),
  ctrlWrapper(loginUserController),
);

router.post('/logout', jsonParser, ctrlWrapper(logoutUserController));

router.post('/refresh', jsonParser, ctrlWrapper(refreshUsersSessionController));

router.post(
  '/send-reset-email',
  validateBody(sendResetEmailSchema),
  ctrlWrapper(sendResetEmailController),
);

router.post(
  '/reset-pwd',
  validateBody(resetPasswordSchema),
  ctrlWrapper(resetPasswordController),
);

export default router;
