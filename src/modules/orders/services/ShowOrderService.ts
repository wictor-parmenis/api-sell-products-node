import { CustomersRepository } from '@modules/customers/typeorm/repositories/CustomersRepository';
import { ProductRepository } from '@modules/products/typeorm/repositories/productsRepository';
import { AppError } from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Order from '../typeorm/entities/Order';
import {
  IProduct,
  OrderRepository,
} from '../typeorm/repositories/OrdersRepository';

export interface ISimpleProduct {
  id: string;
  quantity: number;
}
interface IRequest {
  customer_id: string;
  products: ISimpleProduct[];
}

class ShowOrderService {
  public async execute(id: string): Promise<Order | undefined> {
    const orderRepository = getCustomRepository(OrderRepository);
    const order = await orderRepository.findById(id);

    if (!order) {
      throw new AppError('Order not found');
    }

    return order;
  }
}

export default ShowOrderService;
