import { AppError } from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Customer from '../typeorm/entities/Customer';
import { CustomersRepository } from '../typeorm/repositories/CustomersRepository';

interface IRequest {
  name: string;
  email: string;
}

class CreateCustomerService {
  public async execute({ name, email }: IRequest): Promise<Customer> {
    const customerRepository = await getCustomRepository(CustomersRepository);
    const customerExist = await customerRepository.findByEmail(email);

    if (customerExist) {
      throw new AppError('There is already exist user with this email.');
    }

    const customer = await customerRepository.create({
      name,
      email,
    });

    await customerRepository.save(customer);

    return customer;
  }
}

export default CreateCustomerService;
