import redisCache from '@shared/cache/RedisCache';
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
    const keyProductCache = '@apivendas_PRODUCTS_LIST';
    const productsRepository = await getCustomRepository(ProductRepository);
    const productExist = await productsRepository.findByName(name);

    if (productExist) {
      throw new AppError('there is already exist product with this name');
    }

    const product = await productsRepository.create({ name, quantity, price });

    await redisCache.invalidate(keyProductCache);
    await productsRepository.save(product);

    return product;
  }
}

export default CreateProductService;
