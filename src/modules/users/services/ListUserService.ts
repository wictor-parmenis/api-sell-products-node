import { AppError } from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Product from '../typeorm/entities/User';
import { UserRepository } from '../typeorm/repositories/userRepository';

class ListUserService {
  public async execute(): Promise<Product[]> {
    const userRepository = getCustomRepository(UserRepository);
    const userList = await userRepository.find();
    return userList;
  }
}

export default ListUserService;
