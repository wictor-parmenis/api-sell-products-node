import { getCustomRepository } from 'typeorm';
import { CustomersRepository } from '../typeorm/repositories/CustomersRepository';
import Customer from '../typeorm/entities/Customer';

class ListCustomersService {
  public async execute(): Promise<Customer[]> {
    const customerRepository = getCustomRepository(CustomersRepository);
    const customerList = await customerRepository.find();
    return customerList;
  }
}

export default ListCustomersService;
