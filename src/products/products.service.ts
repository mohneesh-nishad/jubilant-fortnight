import { Injectable } from '@nestjs/common';
import { NewProductInput } from './dto/new-product.input';
import { ProductsArgs } from './dto/products.args';
import { Product } from './models/products.model';

@Injectable()
export class ProductsService {
  async create(data: NewProductInput): Promise<Product> {
    return {} as any;
  }

  async findOneById(id: string): Promise<Product> {
    return {
      id: 43, title: 'sandwich', description: 'fokat sandwich', creationDate: new Date('2022-10-23').toISOString(), recipe: {
        id: '12', description: 'mock ingredient', creationDate: new Date('2022-06-30'), ingredients: ['veggies', 'bread', 'butter', 'mayo']
      }
    } as any;
  }

  async findAll(productsArgs: ProductsArgs): Promise<Product[]> {
    return [] as Product[];
  }

  async remove(id: string): Promise<boolean> {
    return true;
  }
}
