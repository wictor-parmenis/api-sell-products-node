import { AppError } from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import { UserRepository } from '../typeorm/repositories/userRepository';
import DiskStorageProvider from '@shared/providers/StorageProvider/DiskStorageProvider';
import uploadConfig from '@config/uploadConfig';
import S3StorageProvider from '@shared/providers/StorageProvider/S3StorageProvider';

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

    if (uploadConfig.driver === 's3') {
      const storageProvider = new S3StorageProvider();
      if (user) {
        if (user.avatar) {
          await storageProvider.deleteFile(user.avatar);
        }
      }
      const fileName = await storageProvider.saveFile(avatarFileName);
      user.avatar = fileName;
    } else {
      const storageProvider = new DiskStorageProvider();
      if (user) {
        if (user.avatar) {
          await storageProvider.deleteFile(user.avatar);
        }
      }
      const fileName = await storageProvider.saveFile(avatarFileName);
      user.avatar = fileName;
    }

    await userRepository.save(user);

    return user;
  }
}

export default UpdateUserAvatarService;
