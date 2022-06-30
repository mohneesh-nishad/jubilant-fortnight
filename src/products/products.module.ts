import { Module } from '@nestjs/common';
import { DateScalar } from '../common/scalars/date.scalar';
import { ProductsResolver } from './products.resolver';
import { ProductsService } from './products.service';

@Module({
  providers: [ProductsResolver, ProductsService, DateScalar],
})
export class ProductsModule { }
