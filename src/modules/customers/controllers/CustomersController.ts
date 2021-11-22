import { Request, Response } from 'express';
import CreateCustomerService from '../services/CreateCustomerService';
import DeleteCustomerService from '../services/DeleteCustomerService';
import UpdateCustomerService from '../services/UpdateProfileService';
import ListCustomersService from '../services/ListCustomersService';
import ShowCustomerService from '../services/ShowCustomerService';

export default class CustomersController {
  public async index(req: Request, res: Response): Promise<Response> {
    const listCostumer = await new ListCustomersService().execute();

    return res.json(listCostumer);
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const { email, name } = req.body;

    const customerCreate = await new CreateCustomerService().execute({
      email,
      name,
    });

    return res.json(customerCreate);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { name, email } = request.body;
    const { id } = request.params;

    const updateCustomer = new UpdateCustomerService();

    const customer = await updateCustomer.execute({
      id,
      name,
      email,
    });

    return response.json(customer);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteCustomer = new DeleteCustomerService();

    await deleteCustomer.execute({ id });

    return response.json([]);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showCustomer = new ShowCustomerService();

    const customer = await showCustomer.execute({ id });

    return response.json(customer);
  }
}
