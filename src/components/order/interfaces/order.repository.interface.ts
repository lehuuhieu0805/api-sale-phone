import { IBaseRepository } from './../../../repositories/base/base.interface.repository';
import { User } from './../../user/user.entity';
import { Order } from './../order.entity';

export const ORDER_REPOSITORY = 'ORDER REPOSITORY';

export interface IOrderRepository extends IBaseRepository<Order> {
  getAllByUser(user: User): Promise<Order[]>;
  getById(id: string, user: User): Promise<Order>;
}
