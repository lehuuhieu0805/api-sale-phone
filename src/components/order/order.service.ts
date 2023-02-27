import { Inject, Injectable } from '@nestjs/common';
import { User } from './../user/user.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import {
  IOrderRepository,
  ORDER_REPOSITORY,
} from './interfaces/order.repository.interface';
import { IOrderService } from './interfaces/order.service.interface';
import { Order } from './order.entity';

@Injectable()
export class OrderService implements IOrderService {
  constructor(
    @Inject(ORDER_REPOSITORY)
    private readonly orderRepository: IOrderRepository,
  ) {}

  async getById(id: string, user: User): Promise<Order> {
    return this.orderRepository.getById(id, user);
  }

  async getAll(user: User): Promise<Order[]> {
    return this.orderRepository.getAllByUser(user);
  }

  async create(createOrderDto: CreateOrderDto, user: User): Promise<Order> {
    const order = new Order();
    order.totalPrice = createOrderDto.totalPrice;
    order.totalQuantity = createOrderDto.totalQuantity;
    order.dateCreated = createOrderDto.dateCreated;
    order.status = createOrderDto.status;
    order.user = user;

    return this.orderRepository.create(order);
  }
}
