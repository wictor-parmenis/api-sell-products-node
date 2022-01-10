import { getCustomRepository } from 'typeorm';
import Product from '../typeorm/entities/product';
import { ProductRepository } from '../typeorm/repositories/productsRepository';
import redisCache from '@shared/cache/RedisCache';

class ListProductService {
  public async execute(): Promise<Product[]> {
    const productsRepository = getCustomRepository(ProductRepository);
    const keyProductCache = '@apivendas_PRODUCTS_LIST';

    let products = await redisCache.recover<Product[]>(keyProductCache);

    if (!products) {
      products = await productsRepository.find();

      await redisCache.save(keyProductCache, products);
    }
    return products;
  }
}

export default ListProductService;
