import { Module } from '@nestjs/common';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';
import { CART_SERVICE } from './interfaces/cart.service.interface';

@Module({
  providers: [
    {
      provide: CART_SERVICE,
      useClass: CartService,
    },
  ],
  controllers: [CartController],
})
export class CartModule {}
