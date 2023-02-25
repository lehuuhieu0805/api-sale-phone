import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Order } from '../order/order.entity';
import { Phone } from '../phone/phone.entity';

@Entity('order_items')
export class OrderItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  quantity: number;

  @Column()
  price: number;

  @ManyToOne(() => Order, (order) => order.orderItems, {
    eager: false,
    nullable: false,
  })
  @JoinColumn({
    name: 'orderId',
    referencedColumnName: 'id',
  })
  order: Order;

  @ManyToOne(() => Phone, (phone) => phone.orderItems, {
    eager: false,
    nullable: false,
  })
  @JoinColumn({
    name: 'phoneId',
    referencedColumnName: 'id',
  })
  phone: Phone;
}
