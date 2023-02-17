import { ApiProperty } from '@nestjs/swagger';

export class CreatePhoneDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  price: number;

  @ApiProperty()
  quantity: number;

  @ApiProperty({ type: 'string', format: 'binary' })
  image: any;
}
