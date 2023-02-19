import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsOptional, Min } from 'class-validator';

export class UpdatePhoneDto {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsInt()
  @Min(1)
  @Type(() => Number)
  price: number;

  @ApiProperty()
  @IsInt()
  @Min(1)
  @Type(() => Number)
  quantity: number;

  @ApiProperty({ type: 'string', format: 'binary', required: false })
  @IsOptional()
  image: any;

  @ApiProperty()
  @IsNotEmpty()
  status: string;
}
