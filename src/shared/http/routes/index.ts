import { Request, Response, Router } from 'express';

export const routes = Router();

routes.get('/', (req: Request, res: Response) => {
  res.status(200).send({ message: 'API Sell - Beta' });
});
