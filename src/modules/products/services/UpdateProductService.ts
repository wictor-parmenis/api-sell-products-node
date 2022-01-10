import redisCache from '@shared/cache/RedisCache';
import { AppError } from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Product from '../typeorm/entities/product';
import { ProductRepository } from '../typeorm/repositories/productsRepository';

interface IRequest {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

class UpdateProductService {
  public async execute({
    id,
    name,
    price,
    quantity,
  }: IRequest): Promise<Product | undefined> {
    const productsRepository = getCustomRepository(ProductRepository);
    const keyProductCache = '@apivendas_PRODUCTS_LIST';

    const product = await productsRepository.findOne(id);

    if (!product) {
      throw new AppError('Product not exist.');
    }
    await redisCache.invalidate(keyProductCache);

    const productExist = await productsRepository.findByName(name);

    if (productExist && product.name !== name) {
      throw new AppError('Already exist product with this name.');
    }

    product.name = name;
    product.price = price;
    product.quantity = quantity;

    await productsRepository.save(product);

    return product;
  }
}

export default UpdateProductService;
