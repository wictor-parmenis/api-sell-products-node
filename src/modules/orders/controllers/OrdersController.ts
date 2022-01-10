import { Request, Response } from 'express';
import CreateOrderService from '../services/CreateOrderService';
import ShowOrderService from '../services/ShowOrderService';

export default class OrdersController {
  public async show(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const showOrders = new ShowOrderService();

    const order = await showOrders.execute(id);

    return res.json(order);
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const { customer_id, products } = req.body;

    const orderCreate = new CreateOrderService();

    const order = await orderCreate.execute({
      customer_id,
      products,
    });

    return res.status(202).json(order);
  }
}
