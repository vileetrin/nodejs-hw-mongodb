import express from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';

import { loginUserSchema } from '../validations/auth.js';
import { registerUserSchema } from '../validations/auth.js';

import { logoutUserController } from '../controllers/auth.js';
import { registerUserController } from '../controllers/auth.js';
import { loginUserController } from '../controllers/auth.js';
import { refreshUsersSessionController } from '../controllers/auth.js';

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

export default router;
