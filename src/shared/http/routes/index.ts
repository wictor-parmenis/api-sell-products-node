import { Router } from 'express';
import productsRouter from '@modules/products/routes/products.routes';
import usersRoutes from '@modules/users/routes/users.routes';
import sessionsRoutes from '@modules/users/routes/sessions.routes';
import passwordRoutes from '@modules/users/routes/passwords.routes';
import profilesRoutes from '@modules/users/routes/profiles.routes';

export const routes = Router();

routes.use('/products', productsRouter);
routes.use('/users', usersRoutes);
routes.use('/session', sessionsRoutes);
routes.use('/password', passwordRoutes);
routes.use('/profile', profilesRoutes);
