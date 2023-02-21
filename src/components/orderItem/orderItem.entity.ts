import { Phone } from './../phone/phone.entity';
import { Order } from './../order/order.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('order_items')
export class OrderItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  quantity: number;

  @Column()
  totalPrice: number;

  @ManyToOne(() => Order, (order) => order.orderItems, { eager: false })
  order: Order;

  @ManyToOne(() => Phone, (phone) => phone.orderItems, { eager: false })
  phone: Phone;
}
