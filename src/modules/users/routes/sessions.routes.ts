import { Router } from 'express';
import SessionsController from '../controllers/SessionsController';
import { celebrate, Joi, Segments } from 'celebrate';

const sessionsRoutes = Router();
const sessionsController = new SessionsController();

sessionsRoutes.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      password: Joi.string().required(),
      email: Joi.string().required(),
    },
  }),
  sessionsController.create,
);

export default sessionsRoutes;
