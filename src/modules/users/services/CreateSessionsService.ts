import { AppError } from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import { UserRepository } from '../typeorm/repositories/userRepository';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import authConfig from '@config/authConfig';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: User;
  token: string;
}

class CreateSessionService {
  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const userRepository = await getCustomRepository(UserRepository);
    const userExist = await userRepository.findByEmail(email);

    if (!userExist) {
      throw new AppError('Incorrect password/email.', 401);
    }
    const passwordConfirm = await compare(password, userExist.password);

    if (!passwordConfirm) {
      throw new AppError('Incorrect password.', 401);
    }

    const token = sign({}, `${authConfig.jwt.secret}`, {
      subject: userExist.id,
      expiresIn: authConfig.jwt.expiresIn,
    });

    return { user: userExist, token };
  }
}

export default CreateSessionService;
