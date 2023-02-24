import { User } from './../../user/user.entity';
import { CreateOrderDto } from './../dto/create-order.dto';
import { Order } from './../order.entity';

export const ORDER_SERVICE = 'ORDER SERVICE';

export interface IOrderService {
  create(createOrderDto: CreateOrderDto, user: User): Promise<Order>;
}
