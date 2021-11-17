import { AppError } from '@shared/errors/AppError';
import { compare, hash } from 'bcryptjs';
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import { UserRepository } from '../typeorm/repositories/userRepository';

export interface IRequest {
  user_id: string;
  name: string;
  password?: string;
  old_password?: string;
  email: string;
}

class UpdateProfileService {
  public async execute({
    user_id,
    email,
    name,
    old_password,
    password,
  }: IRequest): Promise<User> {
    const userRepository = getCustomRepository(UserRepository);
    const user = await userRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found.');
    }

    const userUpdateEmail = await userRepository.findByEmail(email);

    if (userUpdateEmail && userUpdateEmail.id !== user_id) {
      throw new AppError('There already one user with this email.');
    }

    if (password && !old_password) {
      throw new AppError('Old Password is required.');
    }

    if (password && old_password) {
      const checkOldPassword = await compare(old_password, user.password);

      if (!checkOldPassword) {
        throw new AppError('Old password does not match.');
      }

      user.password = await hash(password, 8);
    }

    user.email = email;
    user.name = name;

    await userRepository.save(user);

    return user;
  }
}

export default UpdateProfileService;
