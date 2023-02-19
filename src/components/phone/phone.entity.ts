import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
