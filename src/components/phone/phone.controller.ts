import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Inject,
  Param,
  Post,
  Put,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Role } from '../auth/role.enum';
import { RoleGuard } from '../auth/role.guard';
import { StatusEnum } from './../../constants/common';
import { CreatePhoneDto } from './dto/createPhone.dto';
import { UpdatePhoneDto } from './dto/updatePhone.dto';
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

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Get a phone successfully' })
  async getById(@Param('id') id: string) {
    return await this.phoneService.getById(id);
  }

  @Get()
  @ApiResponse({ status: 200, description: 'Get all phones successfully' })
  @ApiQuery({
    name: 'status',
    type: String,
    description: 'Status of phone is ACTIVE or IN_ACTIVE. It is optional',
    required: false,
  })
  async getAll(@Query('status') status?: StatusEnum) {
    return await this.phoneService.getAll(status);
  }

  @Put(':id')
  @ApiResponse({ status: 200, description: 'Update a phone successfully' })
  @UseGuards(RoleGuard(Role.ADMIN))
  @ApiBearerAuth()
  @UseInterceptors(FileInterceptor('image'))
  @ApiConsumes('multipart/form-data')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdatePhoneDto,
    @UploadedFile() image: Express.Multer.File,
  ) {
    if (image) {
      dto.image = image;
    }
    return await this.phoneService.update(id, dto);
  }

  @Delete(':id')
  @ApiResponse({ status: 200, description: 'Delete a phone successfully' })
  @UseGuards(RoleGuard(Role.ADMIN))
  @ApiBearerAuth()
  @HttpCode(204)
  async delete(@Param('id') id: string) {
    return await this.phoneService.delete(id);
  }
}
