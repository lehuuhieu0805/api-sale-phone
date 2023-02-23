import { PhoneDto } from './../dto/phone.dto';

export const CART_SERVICE = 'CART SERVICE';

export interface ICartService {
  getByUsername(username: string): Promise<any>;
  add(user: any, phoneDto: PhoneDto): Promise<any>;
}
