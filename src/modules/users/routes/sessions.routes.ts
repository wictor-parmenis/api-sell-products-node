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

// sessionsRoutes.get(
//   '/:id',
//   celebrate({
//     [Segments.PARAMS]: {
//       id: Joi.string().uuid().required(),
//     },
//   }),
//   sessionsController.show,
// );

// sessionsRoutes.delete(
//   '/:id',
//   celebrate({
//     [Segments.PARAMS]: {
//       id: Joi.string().uuid().required(),
//     },
//   }),
//   sessionsController.delete,
// );

// sessionsRoutes.put(
//   '/:id',
//   celebrate({
//     [Segments.BODY]: {
//       name: Joi.string().required(),
//       price: Joi.number().precision(2).required(),
//       quantity: Joi.number().required(),
//     },
//     [Segments.PARAMS]: {
//       id: Joi.string().uuid().required(),
//     },
//   }),
//   sessionsController.update,
// );

export default sessionsRoutes;
