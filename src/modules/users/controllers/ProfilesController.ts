import { Request, Response } from 'express';
import ShowProfileService from '../services/ShowProfileService';
import UpdateProfileService from '../services/UpdateProfileService';

export default class ProfilesController {
  public async show(req: Request, res: Response): Promise<Response> {
    const user_id = req.user.id;
    const showProfile = await new ShowProfileService().execute({ user_id });

    return res.json(showProfile);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const user_id = req.user.id;
    const { email, name, password, old_password } = req.body;

    const updateProfile = await new UpdateProfileService().execute({
      email,
      name,
      password,
      user_id,
      old_password,
    });

    return res.json(updateProfile);
  }
}
