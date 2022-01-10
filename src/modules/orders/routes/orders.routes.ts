import { celebrate, Segments } from 'celebrate';
import { Router } from 'express';
import Joi from 'joi';
import OrdersController from '../controllers/OrdersController';

const ordersRouter = Router();
const ordersController = new OrdersController();

ordersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      customer_id: Joi.string().uuid().required(),
      products: Joi.array().required(),
    },
  }),
  ordersController.create,
);

ordersRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      customer_id: Joi.string().uuid().required(),
    },
  }),
  ordersController.show,
);

export default ordersRouter;
