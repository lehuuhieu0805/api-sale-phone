import { TypeOfQuantityInCartEnum } from './../../constants/common';
import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { GetUser } from '../auth/getUser.decorator';
import { JwtAuthGuard } from './../auth/jwt-auth.guard';
import { PhoneDto } from './dto/phone.dto';
import {
  CART_SERVICE,
  ICartService,
} from './interfaces/cart.service.interface';

@Controller('carts')
@ApiTags('Cart')
export class CartController {
  constructor(
    @Inject(CART_SERVICE)
    private readonly cartService: ICartService,
  ) {}

  @Get(':username')
  @ApiResponse({
    status: 200,
    description: 'Get cart by username successfully',
  })
  async getByUsername(@Param('username') username: string) {
    return await this.cartService.getByUsername(username);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: 201,
    description: 'Add to cart successfully',
  })
  @ApiQuery({
    name: 'type',
    enum: TypeOfQuantityInCartEnum,
    description: 'Type of quantity in cart is up or down',
  })
  @ApiBearerAuth()
  async create(
    @Query('type') type: TypeOfQuantityInCartEnum,
    @GetUser() user,
    @Body() phoneDto: PhoneDto,
  ) {
    return await this.cartService.create(user, phoneDto, type);
  }
}
