import { AppError } from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import { UserRepository } from '../typeorm/repositories/userRepository';

interface IRequest {
  email: string;
}
class ShowUserService {
  public async execute({ email }: IRequest): Promise<User | undefined> {
    const userRepository = getCustomRepository(UserRepository);
    const user = await userRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Product not found.');
    }

    return user;
  }
}

export default ShowUserService;
