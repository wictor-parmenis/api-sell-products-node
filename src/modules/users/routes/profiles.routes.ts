import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import isAuthenticated from '../../../shared/http/middlewares/isAuthenticated';
import ProfilesController from '../controllers/ProfilesController';

const profilesRoutes = Router();
const profilesController = new ProfilesController();

profilesRoutes.use(isAuthenticated);

profilesRoutes.get('/', profilesController.show);

profilesRoutes.put(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      password: Joi.string().optional(),
      password_confirmation: Joi.string()
        .valid(Joi.ref('password'))
        .when('password', {
          is: Joi.exist(),
          then: Joi.required(),
        }),
      email: Joi.string().required(),
      old_password: Joi.string(),
    },
  }),
  profilesController.update,
);

export default profilesRoutes;
