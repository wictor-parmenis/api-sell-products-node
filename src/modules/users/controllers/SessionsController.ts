import { Request, Response } from 'express';
import CreateSessionService from '../services/CreateSessionsService';
import CreateUserService from '../services/CreateUserService';
import ListUserService from '../services/ListUserService';

export default class SessionsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;

    const createSession = await new CreateSessionService().execute({
      email,
      password,
    });

    return res.json(createSession);
  }
}
