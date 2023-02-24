import { IBaseRepository } from './../../../repositories/base/base.interface.repository';
import { Order } from './../order.entity';

export const ORDER_REPOSITORY = 'ORDER REPOSITORY';

export interface IOrderRepository extends IBaseRepository<Order> {}
