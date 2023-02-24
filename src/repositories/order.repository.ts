import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from 'src/components/order/order.entity';
import { Repository } from 'typeorm';
import { IOrderRepository } from './../components/order/interfaces/order.repository.interface';
import { BaseAbstractRepository } from './base/base.abstract.repository';

@Injectable()
export class OrderRepository
  extends BaseAbstractRepository<Order>
  implements IOrderRepository
{
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {
    super(orderRepository);
  }
}
