import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IOrderItemRepository } from './../components/order-item/interfaces/order-item.repository';
import { OrderItem } from './../components/order-item/order-item.entity';
import { BaseAbstractRepository } from './base/base.abstract.repository';

export class OrderItemRepository
  extends BaseAbstractRepository<OrderItem>
  implements IOrderItemRepository
{
  constructor(
    @InjectRepository(OrderItem)
    private readonly orderItemRepository: Repository<OrderItem>,
  ) {
    super(orderItemRepository);
  }
}
