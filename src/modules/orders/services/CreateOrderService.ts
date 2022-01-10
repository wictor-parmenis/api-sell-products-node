import { CustomersRepository } from '@modules/customers/typeorm/repositories/CustomersRepository';
import { ProductRepository } from '@modules/products/typeorm/repositories/productsRepository';
import { AppError } from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Order from '../typeorm/entities/Order';
import OrdersRepository from '../typeorm/repositories/OrdersRepository';
export interface ISimpleProduct {
  id: string;
  quantity: number;
}
interface IRequest {
  customer_id: string;
  products: ISimpleProduct[];
}

class CreateOrderService {
  public async execute({
    customer_id,
    products,
  }: IRequest): Promise<Order | undefined> {
    const orderRepository = getCustomRepository(OrdersRepository);
    const customerRepository = getCustomRepository(CustomersRepository);
    const productRepository = getCustomRepository(ProductRepository);

    const customerExist = await customerRepository.findById(customer_id);

    if (!customerExist) {
      throw new AppError('Could not find customer with this id.');
    }

    const productsExists = await productRepository.findAllByIds(products);

    if (productsExists.length === 0) {
      throw new AppError('Could not find products with this ids.');
    }

    const existProductsIds = products.map(product => product.id);

    const checkInexistentProducts = products.filter(
      product => !existProductsIds.includes(product.id),
    );

    if (checkInexistentProducts.length > 0) {
      throw new AppError(
        `Could not find product with this id: ${checkInexistentProducts[0].id} .`,
      );
    }

    const quantityAvailable = products.filter(
      product =>
        productsExists.filter(item => item.id === product.id)[0].quantity <
        product.quantity,
    );

    if (quantityAvailable.length) {
      throw new AppError(
        `The quantity ${quantityAvailable[0].quantity} is not available for ${quantityAvailable[0].id}.`,
      );
    }

    const serializedProducts = products.map(product => ({
      product_id: product.id,
      quantity: product.quantity,
      price: productsExists.filter(item => item.id === product.id)[0].price,
    }));

    const order = await orderRepository.createOrder({
      customer: customerExist,
      products: serializedProducts,
    });

    const { order_products } = order;

    const orderProductsQuantity = order_products.filter(item => ({
      id: item.id,
      quantity: productsExists.filter(item => item.id === item.id)[0].quantity,
    }));

    await productRepository.save(orderProductsQuantity);

    return order;
  }
}

export default CreateOrderService;
