import redisCache from '@shared/cache/RedisCache';
import { AppError } from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import { ProductRepository } from '../typeorm/repositories/productsRepository';

interface IRequest {
  id: string;
}
class DeleteProductService {
  public async execute({ id }: IRequest): Promise<string | undefined> {
    const productsRepository = getCustomRepository(ProductRepository);
    const keyProductCache = '@apivendas_PRODUCTS_LIST';
    const product = await productsRepository.findOne(id);

    if (!product) {
      throw new AppError('Product not found.');
    }

    await redisCache.invalidate(keyProductCache);

    await productsRepository.remove(product);

    return 'Product deleted sucessfully.';
  }
}

export default DeleteProductService;
