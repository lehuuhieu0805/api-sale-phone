import {
  Body,
  Controller,
  Inject,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Role } from '../auth/role.enum';
import { RoleGuard } from '../auth/role.guard';
import { CreatePhoneDto } from './dto/createPhone.dto';
import {
  IPhoneService,
  PHONE_SERVICE,
} from './interfaces/phone.service.interface';

@ApiTags('Phone')
@Controller('phones')
export class PhoneController {
  constructor(
    @Inject(PHONE_SERVICE)
    private readonly phoneService: IPhoneService,
  ) {}

  @Post()
  @UseGuards(RoleGuard(Role.ADMIN))
  @ApiBearerAuth()
  @ApiResponse({
    status: 201,
    description: 'Create a phone successfully',
  })
  @ApiBody({
    type: CreatePhoneDto,
  })
  @UseInterceptors(FileInterceptor('image'))
  @ApiConsumes('multipart/form-data')
  async create(
    @Body() dto: CreatePhoneDto,
    @UploadedFile() image: Express.Multer.File,
  ) {
    dto.image = image;
    return await this.phoneService.create(dto);
  }
}
