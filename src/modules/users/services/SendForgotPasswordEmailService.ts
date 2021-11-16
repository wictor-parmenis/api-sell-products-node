import { AppError } from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import { UserRepository } from '../typeorm/repositories/userRepository';
import { UserTokensRepository } from '../typeorm/repositories/UserTokensRepository';
import EtherealMail from '../../../config/mail/mailConfig';

interface IRequest {
  email: string;
}

class SendForgotPasswordEmailService {
  public async execute({ email }: IRequest): Promise<void> {
    const userRepository = getCustomRepository(UserRepository);
    const userTokenRepository = getCustomRepository(UserTokensRepository);
    const user = await userRepository.findByEmail(email);
    if (!user) {
      throw new AppError('User does not exists.');
    }

    const token = await userTokenRepository.generate(user.id);

    try {
      await EtherealMail.sendMail({
        to: {
          email,
          name: user.name,
        },
        subject: '[API vendas] Recovery password.',
        templateData: {
          template: `Olá {{name}}: {{token}}`,
          variables: {
            name: user.name,
            token: token.token,
          },
        },
      });
    } catch (error) {
      console.log({ error });
    }
  }
}

export default SendForgotPasswordEmailService;
