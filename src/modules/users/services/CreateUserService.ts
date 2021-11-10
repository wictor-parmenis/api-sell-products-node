import { AppError } from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import { UserRepository } from '../typeorm/repositories/userRepository';
import { encodeBase64, hash } from 'bcryptjs';

interface IRequest {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  public async execute({ name, email, password }: IRequest): Promise<User> {
    const userRepository = await getCustomRepository(UserRepository);
    const userExist = await userRepository.findByEmail(email);

    if (userExist) {
      throw new AppError('There is already exist user with this email.');
    }

    const hashPassword = await hash(password, 8);

    const user = await userRepository.create({
      name,
      email,
      password: hashPassword,
    });

    await userRepository.save(user);

    return user;
  }
}

export default CreateUserService;
