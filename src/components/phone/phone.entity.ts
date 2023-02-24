import { OrderItem } from './../order-item/order-item.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('phones')
export class Phone {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  price: number;

  @Column()
  quantity: number;

  @Column()
  image: string;

  @Column()
  status: string;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.phone, { eager: false })
  orderItems: OrderItem[];
}
