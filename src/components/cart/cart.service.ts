import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { PhoneDto } from './dto/phone.dto';
import { ICartService } from './interfaces/cart.service.interface';

@Injectable()
export class CartService implements ICartService {
  constructor(
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {}

  async add(user: any, phoneDto: PhoneDto): Promise<any> {
    const cart: Array<PhoneDto> =
      (await this.cacheManager.get(`cart:${user.username}`)) || [];

    // cart empty
    if (cart.length == 0) {
      phoneDto.quantity = 1;
      cart.push(phoneDto);
      return await this.cacheManager.set(`cart:${user.username}`, cart, 0);
    }

    // find item in cart
    for (const cartItem of cart) {
      if (phoneDto.id === cartItem.id) {
        cartItem.quantity += 1;
        return await this.cacheManager.set(`cart:${user.username}`, cart, 0);
      }
    }

    // add new item to cart if item not exist in cart
    phoneDto.quantity = 1;
    cart.push(phoneDto);
    return await this.cacheManager.set(`cart:${user.username}`, cart, 0);
  }

  async getByUsername(username: string): Promise<any> {
    return await this.cacheManager.get(`cart:${username}`);
  }
}
