import { NotFoundException } from '@nestjs/common';
import { Args, Directive, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { NewProductInput } from './dto/new-product.input';
import { ProductsArgs } from './dto/products.args';
import { Product } from './models/products.model';
import { ProductsService } from './products.service';

const pubSub = new PubSub();

@Resolver((of) => Product)
export class ProductsResolver {
  constructor(private readonly productService: ProductsService) { }

  @Query((returns) => Product)
  async product(@Args('id') id: string): Promise<Product> {
    console.log('resolver running')
    const product = await this.productService.findOneById(id);
    if (!product) {
      throw new NotFoundException(id);
    }
    console.log(product, '<<<====  product')
    return product;
  }

  @Directive('@deprecated(reason: "This query will be removed in next update.")')
  @Query((returns) => [Product])
  async products(@Args() productsArgs: ProductsArgs): Promise<Product[]> {
    return this.productService.findAll(productsArgs);
  }

  @Mutation((returns) => Product)
  async addProduct(
    @Args('newProductData') newProductData: NewProductInput,
  ): Promise<Product> {
    const product = await this.productService.create(newProductData);
    pubSub.publish('productAdded', { productAdded: product });
    return product;
  }

  @Mutation((returns) => Boolean)
  async removeProduct(@Args('id') id: string) {
    return this.productService.remove(id);
  }

  @Subscription((returns) => Product)
  productAdded() {
    return pubSub.asyncIterator('productAdded');
  }
}
