import {
  CACHE_MANAGER,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Cache } from 'cache-manager';
import { DataSource } from 'typeorm';
import { StatusEnum } from './../../constants/common';
import {
  IOrderItemRepository,
  ORDER_ITEM_REPOSITORY,
} from './../order-item/interfaces/order-item.repository.interface';
import { OrderItem } from './../order-item/order-item.entity';
import {
  IPhoneRepository,
  PHONE_REPOSITORY,
} from './../phone/interfaces/phone.repository.interface';
import { Phone } from './../phone/phone.entity';
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

    @Inject(ORDER_ITEM_REPOSITORY)
    private readonly orderItemRepository: IOrderItemRepository,

    @Inject(PHONE_REPOSITORY)
    private readonly phoneRepository: IPhoneRepository,

    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,

    private dataSource: DataSource,
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

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const order = new Order();
      order.totalPrice = createOrderDto.totalPrice;
      order.totalQuantity = createOrderDto.totalQuantity;
      order.dateCreated = new Date();
      order.status = 'SUCCESS';
      order.user = user;

      // const orderCreated = await this.orderRepository.create(order);
      const orderCreated = await queryRunner.manager.save(order);

      for (const cartItem of cart) {
        // const phone = await this.phoneRepository.findById(cartItem.id);
        const phone = await queryRunner.manager.findOneBy(Phone, {
          id: cartItem.id,
        });
        phone.quantity -= cartItem.quantity;
        console.log(phone.quantity);
        if (phone.quantity < 0) {
          await queryRunner.rollbackTransaction();
          throw new HttpException(
            'Quantity of phone is not enough',
            HttpStatus.BAD_REQUEST,
          );
        } else if (phone.quantity === 0) {
          phone.status = StatusEnum.INACTIVE;
        }
        try {
          // await this.phoneRepository.updatePhone(phone.id, phone);
          await queryRunner.manager.update(Phone, phone.id, phone);
        } catch (error) {
          await queryRunner.rollbackTransaction();
          throw new HttpException(
            'Update phone failed',
            HttpStatus.BAD_REQUEST,
          );
        }

        const orderItem = new OrderItem();
        orderItem.quantity = cartItem.quantity;
        orderItem.price = cartItem.price;
        orderItem.phone = phone;
        orderItem.order = orderCreated;

        try {
          // await this.orderItemRepository.create(orderItem);
          await queryRunner.manager.save(orderItem);

          await this.cacheManager.del(`cart:${user.username}`);
        } catch (error) {
          await queryRunner.rollbackTransaction();
          throw new HttpException(
            'Create order item failed',
            HttpStatus.BAD_REQUEST,
          );
        }
        await queryRunner.commitTransaction();
        return orderCreated;
      }
    } catch (error) {
      if (error instanceof HttpException) {
        throw new HttpException(error.message, error.getStatus());
      } else {
        await queryRunner.rollbackTransaction();
        throw new HttpException(
          'Create order failed',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    } finally {
      await queryRunner.release();
    }
  }
}
