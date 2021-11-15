import { Request, Response } from 'express';
import CreateUserService from '../services/CreateUserService';
import ListUserService from '../services/ListUserService';
import SendForgotPasswordEmailService from '../services/SendForgotPasswordEmailService';

export default class ForgotPasswordController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { email } = req.body;

    const sendForgotPasswordEmailService = new SendForgotPasswordEmailService();

    const user = await sendForgotPasswordEmailService.execute({
      email,
    });

    return res.status(204).json();
  }
}
