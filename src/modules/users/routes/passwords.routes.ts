import { Router } from 'express';
import SessionsController from '../controllers/SessionsController';
import { celebrate, Joi, Segments } from 'celebrate';
import ForgotPasswordController from '../controllers/ForgotPasswordController';

const passwordRoutes = Router();
const forgotPasswordController = new ForgotPasswordController();

passwordRoutes.post(
  '/forgot',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().required(),
    },
  }),
  forgotPasswordController.create,
);

export default passwordRoutes;
