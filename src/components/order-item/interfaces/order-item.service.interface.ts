import { CreateOrderItemDto } from './../dto/create-order-item.dto';
import { OrderItem } from './../order-item.entity';

export const ORDER_ITEM_SERVICE = 'ORDER ITEM SERVICE';

export interface IOrderItemService {
  create(createOrderItemDto: CreateOrderItemDto): Promise<OrderItem>;
}
