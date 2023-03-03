import { TypeOfQuantityInCartEnum } from './../../constants/common';
import {
  CACHE_MANAGER,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Cache } from 'cache-manager';
import { PhoneDto } from './dto/phone.dto';
import { ICartService } from './interfaces/cart.service.interface';

@Injectable()
export class CartService implements ICartService {
  constructor(
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {}

  async create(
    user: any,
    phoneDto: PhoneDto,
    type: TypeOfQuantityInCartEnum,
  ): Promise<any> {
    const cart: Array<PhoneDto> =
      (await this.cacheManager.get(`cart:${user.username}`)) || [];

    // cart empty
    if (cart.length == 0) {
      cart.push(phoneDto);
      return await this.cacheManager.set(`cart:${user.username}`, cart, 0);
    }

    // find item in cart
    for (const cartItem of cart) {
      if (phoneDto.id === cartItem.id) {
        if (type === TypeOfQuantityInCartEnum.UP) {
          cartItem.quantity += 1;
        } else if (type === TypeOfQuantityInCartEnum.DOWN) {
          cartItem.quantity -= 1;

          // if quantity of item in cart is 0, remove item in cart
          if (cartItem.quantity === 0) {
            cart.splice(cart.indexOf(cartItem), 1);
          }
        } else {
          throw new HttpException(
            'Type of quantity in cart is invalid',
            HttpStatus.BAD_REQUEST,
          );
        }
        return await this.cacheManager.set(`cart:${user.username}`, cart, 0);
      }
    }

    // add new item to cart if item not exist in cart
    cart.push(phoneDto);
    return await this.cacheManager.set(`cart:${user.username}`, cart, 0);
  }

  async getByUsername(username: string): Promise<any> {
    return await this.cacheManager.get(`cart:${username}`);
  }
}
