import { ISimpleProduct } from '@modules/orders/services/CreateOrderService';
import { IProduct } from '@modules/orders/typeorm/repositories/OrdersRepository';
import { EntityRepository, In, Repository } from 'typeorm';
import Product from '../entities/product';

export interface IFindProducts {
  id: string;
}

@EntityRepository(Product)
export class ProductRepository extends Repository<Product> {
  public async findByName(name: string): Promise<Product | undefined> {
    const product = await this.findOne({
      where: {
        name,
      },
    });

    return product;
  }

  public async findAllByIds(products: ISimpleProduct[]): Promise<Product[]> {
    const productsIds: string[] = products.map(product => product.id);

    const existProducts = await this.find({
      where: {
        id: In(productsIds),
      },
    });

    return existProducts;
  }
}
