import { StatusEnum } from './../../constants/common';
import { OrderItem } from './../order-item/order-item.entity';
import { Phone } from './../phone/phone.entity';
import {
  PHONE_REPOSITORY,
  IPhoneRepository,
} from './../phone/interfaces/phone.repository.interface';
import {
  ORDER_ITEM_REPOSITORY,
  IOrderItemRepository,
} from './../order-item/interfaces/order-item.repository.interface';
import {
  CACHE_MANAGER,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { User } from './../user/user.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import {
  IOrderRepository,
  ORDER_REPOSITORY,
} from './interfaces/order.repository.interface';
import { IOrderService } from './interfaces/order.service.interface';
import { Order } from './order.entity';
import { Cache } from 'cache-manager';

@Injectable()
export class OrderService implements IOrderService {
  constructor(
    @Inject(ORDER_REPOSITORY)
    private readonly orderRepository: IOrderRepository,

    @Inject(ORDER_ITEM_REPOSITORY)
    private readonly orderItemRepository: IOrderItemRepository,

    @Inject(PHONE_REPOSITORY)
    private readonly phoneRepository: IPhoneRepository,

    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {}

  async getById(id: string, user: User): Promise<Order> {
    return this.orderRepository.getById(id, user);
  }

  async getAll(user: User): Promise<Order[]> {
    return this.orderRepository.getAllByUser(user);
  }

  async create(createOrderDto: CreateOrderDto, user: User): Promise<Order> {
    const cart: Phone[] =
      (await this.cacheManager.get(`cart:${user.username}`)) || [];

    if (cart.length === 0) {
      throw new HttpException('Cart is empty', HttpStatus.BAD_REQUEST);
    }

    for (const cartItem of cart) {
      const phone = await this.phoneRepository.findById(cartItem.id);
      if (phone.quantity < cartItem.quantity) {
        throw new HttpException(
          'Quantity of phone is not enough',
          HttpStatus.BAD_REQUEST,
        );
      }
    }

    const order = new Order();
    order.totalPrice = createOrderDto.totalPrice;
    order.totalQuantity = createOrderDto.totalQuantity;
    order.dateCreated = new Date();
    order.status = 'SUCCESS';
    order.user = user;

    const orderCreated = await this.orderRepository.create(order);

    for (const cartItem of cart) {
      const phone = await this.phoneRepository.findById(cartItem.id);
      phone.quantity -= cartItem.quantity;
      if (phone.quantity === 0) {
        phone.status = StatusEnum.INACTIVE;
      }
      try {
        await this.phoneRepository.updatePhone(phone.id, phone);
      } catch (error) {
        throw new HttpException('Update phone failed', HttpStatus.BAD_REQUEST);
      }

      const orderItem = new OrderItem();
      orderItem.quantity = cartItem.quantity;
      orderItem.price = cartItem.price;
      orderItem.phone = phone;
      orderItem.order = orderCreated;

      try {
        await this.orderItemRepository.create(orderItem);

        await this.cacheManager.del(`cart:${user.username}`);
      } catch (error) {
        throw new HttpException(
          'Create order item failed',
          HttpStatus.BAD_REQUEST,
        );
      }
    }

    return orderCreated;
  }
}
