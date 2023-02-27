import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
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

    // check quantity of phone
    if (phone.quantity < createOrderItemDto.quantity) {
      throw new HttpException(
        'Quantity of phone is not enough',
        HttpStatus.BAD_REQUEST,
      );
    }

    const orderItem = new OrderItem();
    orderItem.quantity = createOrderItemDto.quantity;
    orderItem.price = createOrderItemDto.price;
    orderItem.phone = phone;
    orderItem.order = order;

    // update quantity of phone
    phone.quantity -= orderItem.quantity;
    try {
      await this.phoneRepository.updatePhone(phone.id, phone);
    } catch (error) {
      throw new HttpException('Update phone failed', HttpStatus.BAD_REQUEST);
    }

    try {
      return await this.orderItemRepository.create(orderItem);
    } catch (error) {
      throw new HttpException(
        'Create order item failed',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
