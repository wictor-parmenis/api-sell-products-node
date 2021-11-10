import { AppError } from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import { UserRepository } from '../typeorm/repositories/userRepository';
import { compare } from 'bcryptjs';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: User;
}

class CreateSessionService {
  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const userRepository = await getCustomRepository(UserRepository);
    const userExist = await userRepository.findByEmail(email);

    if (!userExist) {
      throw new AppError('Incorrect password/email.', 401);
    }
    const passwordConfig = await compare(password, userExist.password);

    if (!passwordConfig) {
      throw new AppError('Incorrect password.', 401);
    }

    return { user: userExist };
  }
}

export default CreateSessionService;
