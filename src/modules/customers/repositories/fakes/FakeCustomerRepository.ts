import ICreateCustomerDTO from '@modules/customers/dtos/ICreateCustomerDTO';
import ICustomerRepository from '@modules/customers/repositories/ICustomersRepository';
import { uuid } from 'uuidv4';
import Customer from '../../infra/typeorm/entities/Customer';

class FakeCustomerRepository implements ICustomerRepository {
  private customers: Customer[] = [];

  public async create(customerData: ICreateCustomerDTO): Promise<Customer> {
    const customer = new Customer();

    Object.assign(customer, { id: uuid() }, customerData);

    this.customers.push(customer);

    return customer;
  }

  public async findByEmail(email: string): Promise<Customer | undefined> {
    const findCustomer = this.customers.find(
      customer => customer.email === email,
    );
    return findCustomer;
  }

  public async findById(id: string): Promise<Customer | undefined> {
    const findCustomer = this.customers.find(customer => customer.id === id);
    return findCustomer;
  }
}

export default FakeCustomerRepository;
