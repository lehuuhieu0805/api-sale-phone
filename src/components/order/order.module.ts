import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderRepository } from './../../repositories/order.repository';
import { OrderItemModule } from './../order-item/order-item.module';
import { PhoneModule } from './../phone/phone.module';
import { UserModule } from './../user/user.module';
import { ORDER_REPOSITORY } from './interfaces/order.repository.interface';
import { ORDER_SERVICE } from './interfaces/order.service.interface';
import { OrderController } from './order.controller';
import { Order } from './order.entity';
import { OrderService } from './order.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order]),
    UserModule,
    OrderItemModule,
    PhoneModule,
  ],
  controllers: [OrderController],
  providers: [
    {
      provide: ORDER_SERVICE,
      useClass: OrderService,
    },
    {
      provide: ORDER_REPOSITORY,
      useClass: OrderRepository,
    },
  ],
  exports: [ORDER_REPOSITORY],
})
export class OrderModule {}
