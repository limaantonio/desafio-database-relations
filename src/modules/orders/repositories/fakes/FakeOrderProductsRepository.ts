import IOrdersRepository from '@modules/orders/repositories/IOrdersRepository';
import ICreateOrderDTO from '@modules/orders/dtos/ICreateOrderDTO';
import { uuid } from 'uuidv4';
import Order from '../../infra/typeorm/entities/Order';

class FakeOrdersRepository implements IOrdersRepository {
  private orders: Order[] = [];

  public async create({ customer, products }: ICreateOrderDTO): Promise<Order> {
    const order = new Order();

    Object.assign(order, { id: uuid() }, { customer, products });

    this.orders.push(order);

    return order;
  }

  public async findById(id: string): Promise<Order | undefined> {
    const findOrder = this.orders.find(order => order.id === id);
    return findOrder;
  }
}

export default FakeOrdersRepository;
