import { Router } from 'express';
import UsersController from '../controllers/UsersController';
import { celebrate, Joi, Segments } from 'celebrate';
import isAuthenticated from '../../../shared/http/middlewares/isAuthenticated';
import UsersAvatarController from '../controllers/UsersAvatarController';
import multer from 'multer';
import uploadConfig from '@config/uploadConfig';

const usersRoutes = Router();
const usersController = new UsersController();
const usersAvatarController = new UsersAvatarController();
const upload = multer(uploadConfig);

usersRoutes.get('/', isAuthenticated, usersController.index);

usersRoutes.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      password: Joi.string().required(),
      email: Joi.string().required(),
    },
  }),
  usersController.create,
);

usersRoutes.patch(
  '/avatar',
  isAuthenticated,
  upload.single('avatar'),
  usersAvatarController.update,
);

// usersRoutes.get(
//   '/:id',
//   celebrate({
//     [Segments.PARAMS]: {
//       id: Joi.string().uuid().required(),
//     },
//   }),
//   usersController.show,
// );

// usersRoutes.delete(
//   '/:id',
//   celebrate({
//     [Segments.PARAMS]: {
//       id: Joi.string().uuid().required(),
//     },
//   }),
//   usersController.delete,
// );

// usersRoutes.put(
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
//   usersController.update,
// );

export default usersRoutes;
