import { AppError } from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Customer from '../typeorm/entities/Customer';
import { CustomersRepository } from '../typeorm/repositories/CustomersRepository';

export interface IRequest {
  id: string;
  name: string;
  email: string;
}

class UpdateCustomerService {
  public async execute({ id, email, name }: IRequest): Promise<Customer> {
    const customerRepository = getCustomRepository(CustomersRepository);
    const customer = await customerRepository.findById(id);

    if (!customer) {
      throw new AppError('Customer not found.');
    }

    const customerUpdateEmail = await customerRepository.findByEmail(email);

    if (customerUpdateEmail && customerUpdateEmail.email !== email) {
      throw new AppError('There already one customer with this email.');
    }
    customer.email = email;
    customer.name = name;

    await customerRepository.save(customer);

    return customer;
  }
}

export default UpdateCustomerService;
