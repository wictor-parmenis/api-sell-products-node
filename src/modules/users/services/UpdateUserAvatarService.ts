import { AppError } from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import { UserRepository } from '../typeorm/repositories/userRepository';
import { encodeBase64, hash } from 'bcryptjs';
import path from 'path';
import uploadConfig from '@config/uploadConfig';
import fs from 'fs';

interface IRequest {
  userId: string;
  avatarFileName: string;
}

class UpdateUserAvatarService {
  public async execute({ avatarFileName, userId }: IRequest): Promise<User> {
    const userRepository = await getCustomRepository(UserRepository);

    const user = await userRepository.findById(userId);

    if (!user) {
      throw new AppError('User not found.');
    }

    if (user) {
      if (user.avatar) {
        const userAvatarFilePath = path.join(
          uploadConfig.directory,
          user.avatar,
        );
        const userAvatarFileExist = await fs.promises.stat(userAvatarFilePath);

        if (userAvatarFileExist) {
          await fs.promises.unlink(userAvatarFilePath);
        }
      }
    }
    user.avatar = avatarFileName;

    await userRepository.save(user);

    return user;
  }
}

export default UpdateUserAvatarService;
