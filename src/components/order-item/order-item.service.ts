import { Inject, Injectable } from '@nestjs/common';
import {
  IOrderRepository,
  ORDER_REPOSITORY,
} from './../order/interfaces/order.repository.interface';
import {
  IPhoneRepository,
  PHONE_REPOSITORY,
} from './../phone/interfaces/phone.repository.interface';
import { CreateOrderItemDto } from './dto/create-order-item.dto';
import {
  IOrderItemRepository,
  ORDER_ITEM_REPOSITORY,
} from './interfaces/order-item.repository';
import { IOrderItemService } from './interfaces/order-item.service.interface';
import { OrderItem } from './order-item.entity';

@Injectable()
export class OrderItemService implements IOrderItemService {
  constructor(
    @Inject(ORDER_ITEM_REPOSITORY)
    private readonly orderItemRepository: IOrderItemRepository,

    @Inject(PHONE_REPOSITORY)
    private readonly phoneRepository: IPhoneRepository,

    @Inject(ORDER_REPOSITORY)
    private readonly orderRepository: IOrderRepository,
  ) {}

  async create(createOrderItemDto: CreateOrderItemDto): Promise<OrderItem> {
    const phone = await this.phoneRepository.findById(
      createOrderItemDto.phoneId,
    );
    const order = await this.orderRepository.findById(
      createOrderItemDto.orderId,
    );

    const orderItem = new OrderItem();
    orderItem.quantity = createOrderItemDto.quantity;
    orderItem.price = createOrderItemDto.price;
    orderItem.phone = phone;
    orderItem.order = order;

    return await this.orderItemRepository.create(orderItem);
  }
}
