import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderItemRepository } from './../../repositories/order-item.repository';
import { ORDER_ITEM_REPOSITORY } from './interfaces/order-item.repository.interface';
import { OrderItem } from './order-item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OrderItem])],
  providers: [
    {
      provide: ORDER_ITEM_REPOSITORY,
      useClass: OrderItemRepository,
    },
  ],
  exports: [ORDER_ITEM_REPOSITORY],
})
export class OrderItemModule {}
