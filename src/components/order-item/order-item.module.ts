import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderItemRepository } from './../../repositories/order-item.repository';
import { OrderModule } from './../order/order.module';
import { PhoneModule } from './../phone/phone.module';
import { ORDER_ITEM_REPOSITORY } from './interfaces/order-item.repository';
import { ORDER_ITEM_SERVICE } from './interfaces/order-item.service.interface';
import { OrderItemController } from './order-item.controller';
import { OrderItem } from './order-item.entity';
import { OrderItemService } from './order-item.service';

@Module({
  imports: [TypeOrmModule.forFeature([OrderItem]), OrderModule, PhoneModule],
  providers: [
    {
      provide: ORDER_ITEM_SERVICE,
      useClass: OrderItemService,
    },
    {
      provide: ORDER_ITEM_REPOSITORY,
      useClass: OrderItemRepository,
    },
  ],
  controllers: [OrderItemController],
})
export class OrderItemModule {}
