import { AppError } from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Product from '../typeorm/entities/product';
import { ProductRepository } from '../typeorm/repositories/productsRepository';

interface IRequest {
  name: string;
  price: number;
  quantity: number;
}

class CreateProductService {
  public async execute({ name, price, quantity }: IRequest): Promise<Product> {
    const productsRepository = getCustomRepository(ProductRepository);
    const productExist = await productsRepository.findByName(name);

    if (productExist) {
      throw new AppError('there is already exist product with this name');
    }

    const product = productsRepository.create({ name, quantity, price });

    await productsRepository.save(product);

    return product;
  }
}

export default CreateProductService;
