import { TypeOfQuantityInCartEnum } from './../../../constants/common';
import { PhoneDto } from './../dto/phone.dto';

export const CART_SERVICE = 'CART SERVICE';

export interface ICartService {
  getByUsername(username: string): Promise<any>;
  create(
    user: any,
    phoneDto: PhoneDto,
    type: TypeOfQuantityInCartEnum,
  ): Promise<any>;
}
