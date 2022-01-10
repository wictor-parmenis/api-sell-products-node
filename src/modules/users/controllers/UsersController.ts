import { Request, Response } from 'express';
import CreateUserService from '../services/CreateUserService';
import ListUserService from '../services/ListUserService';
import { instanceToInstance } from 'class-transformer';

export default class UsersController {
  public async index(req: Request, res: Response): Promise<Response> {
    const listUser = await new ListUserService().execute();

    return res.json(instanceToInstance(listUser));
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const { email, name, password } = req.body;

    const userCreate = await new CreateUserService().execute({
      email,
      name,
      password,
    });

    return res.json(instanceToInstance(userCreate));
  }
}
