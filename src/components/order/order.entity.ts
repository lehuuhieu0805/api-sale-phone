import { OrderItem } from './../order-item/order-item.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './../user/user.entity';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  totalPrice: number;

  @Column()
  totalQuantity: number;

  @Column()
  dateCreated: Date;

  @Column()
  status: string;

  @ManyToOne(() => User, (user) => user.orders, { eager: false })
  user: User;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order, { eager: false })
  orderItems: OrderItem[];
}