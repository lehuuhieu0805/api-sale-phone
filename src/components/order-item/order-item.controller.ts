import { OrderItem } from './order-item.entity';
import { CreateOrderItemDto } from './dto/create-order-item.dto';
import { OrderItemService } from './order-item.service';
import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ORDER_ITEM_SERVICE } from './interfaces/order-item.service.interface';

@Controller('order-items')
@ApiTags('Order Item')
export class OrderItemController {
  constructor(
    @Inject(ORDER_ITEM_SERVICE)
    private readonly orderItemService: OrderItemService,
  ) {}

  @Post()
  @ApiResponse({
    status: 201,
    description: 'Create the order item successfully',
  })
  async create(
    @Body() createOrderItemDto: CreateOrderItemDto,
  ): Promise<OrderItem> {
    return await this.orderItemService.create(createOrderItemDto);
  }
}
