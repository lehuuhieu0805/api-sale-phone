import { OrderItem } from './../order-item.entity';
import { IBaseRepository } from './../../../repositories/base/base.interface.repository';

export const ORDER_ITEM_REPOSITORY = 'ORDER ITEM REPOSITORY';

export interface IOrderItemRepository extends IBaseRepository<OrderItem> {}
