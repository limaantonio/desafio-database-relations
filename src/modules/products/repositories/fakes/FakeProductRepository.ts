import { uuid } from 'uuidv4';
import IProductsRepository from '@modules/products/repositories/IProductsRepository';
import ICreateProductDTO from '@modules/products/dtos/ICreateProductDTO';
import IUpdateProductsQuantityDTO from '@modules/products/dtos/IUpdateProductsQuantityDTO';
import Product from '../../infra/typeorm/entities/Product';

class FakeProductsRepository implements IProductsRepository {
  private products: Product[] = [];

  public async create({
    name,
    price,
    quantity,
  }: ICreateProductDTO): Promise<Product> {
    const product = new Product();

    Object.assign(product, { id: uuid(), name, price, quantity });

    this.products.push(product);

    return product;
  }

  public async findByName(name: string): Promise<Product | undefined> {
    const findName = this.products.find(product => product.name === name);
    return findName;
  }

  // public async findAllById(products: IFindProducts[]): Promise<Product[]> {}

  // public async updateQuantity(
  //   products: IUpdateProductsQuantityDTO[],
  // ): Promise<Product[]> {
  //   // TODO
  // }
}

export default FakeProductsRepository;
