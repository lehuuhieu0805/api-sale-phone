import { User } from './../user/user.entity';
import { Body, Controller, Inject, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GetUser } from '../auth/getUser.decorator';
import { Role } from '../auth/role.enum';
import { RoleGuard } from './../auth/role.guard';
import { CreateOrderDto } from './dto/create-order.dto';
import {
  IOrderService,
  ORDER_SERVICE,
} from './interfaces/order.service.interface';
import { Order } from './order.entity';

@Controller('orders')
@ApiTags('Order')
export class OrderController {
  constructor(
    @Inject(ORDER_SERVICE)
    private readonly orderService: IOrderService,
  ) {}

  @Post()
  @UseGuards(RoleGuard(Role.USER))
  @ApiResponse({ status: 201, description: 'Create the order successfully' })
  @ApiBearerAuth()
  async create(
    @Body() createOrderDto: CreateOrderDto,
    @GetUser() user: User,
  ): Promise<Order> {
    return await this.orderService.create(createOrderDto, user);
  }
}
