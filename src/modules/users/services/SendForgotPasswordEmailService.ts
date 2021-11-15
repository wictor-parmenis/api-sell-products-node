import { AppError } from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import { UserRepository } from '../typeorm/repositories/userRepository';
import { UserTokensRepository } from '../typeorm/repositories/UserTokensRepository';

interface IRequest {
  email: string;
}

class SendForgotPasswordEmailService {
  public async execute({ email }: IRequest): Promise<void> {
    const userRepository = await getCustomRepository(UserRepository);
    const userTokenRepository = await getCustomRepository(UserTokensRepository);
    const user = await userRepository.findByEmail(email);
    if (!user) {
      throw new AppError('User does not exists.');
    }

    const token = userTokenRepository.generate(user.id);
    console.log({ token });
  }
}

export default SendForgotPasswordEmailService;
