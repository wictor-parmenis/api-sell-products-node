import { Request, response, Response } from 'express';
import CreateUserService from '../services/CreateUserService';
import ListUserService from '../services/ListUserService';
import UpdateUserAvatarService from '../services/UpdateUserAvatarService';

export default class UsersAvatarController {
  public async update(req: Request, res: Response): Promise<Response> {
    const updateAvatar = new UpdateUserAvatarService();

    const user = updateAvatar.execute({
      userId: req.user.id,
      avatarFileName: `${req.file?.filename}`,
    });

    return res.json(user);
  }
}
