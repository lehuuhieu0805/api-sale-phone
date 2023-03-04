import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import axios from 'axios';
import * as FormData from 'form-data';
import { Readable } from 'stream';
import { StatusEnum } from './../../constants/common';
import { CreatePhoneDto } from './dto/createPhone.dto';
import { UpdatePhoneDto } from './dto/updatePhone.dto';
import {
  IPhoneRepository,
  PHONE_REPOSITORY,
} from './interfaces/phone.repository.interface';
import { IPhoneService } from './interfaces/phone.service.interface';
import { Phone } from './phone.entity';

@Injectable()
export class PhoneService implements IPhoneService {
  constructor(
    @Inject(PHONE_REPOSITORY)
    private readonly phoneRepository: IPhoneRepository,
  ) {}

  async delete(id: string): Promise<void> {
    const result = await this.phoneRepository.deletePhone(id);
    if (result == 0) {
      throw new HttpException('Id not found', HttpStatus.BAD_REQUEST);
    }
  }

  async update(id: string, dto: UpdatePhoneDto): Promise<Phone> {
    // user don't upload image or input image empty
    if (dto.image == null || dto.image == '') {
      const phone = await this.getById(id);
      dto.image = phone.image;
    } else {
      const url = await this.uploadFile(dto.image);
      dto.image = url;
    }

    try {
      await this.phoneRepository.updatePhone(id, dto);

      return await this.getById(id);
    } catch (error) {
      throw new HttpException(
        'Update phone failed',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getAll(status: StatusEnum): Promise<Phone[]> {
    return await this.phoneRepository.getAllPhone(status);
  }

  async getById(id: string): Promise<Phone> {
    const phone = await this.phoneRepository.findById(id);
    if (!phone) {
      throw new HttpException('Id not found', HttpStatus.NOT_FOUND);
    }
    return phone;
  }

  async create(dto: CreatePhoneDto): Promise<Phone> {
    const phone = new Phone();
    phone.name = dto.name;
    phone.price = dto.price;
    phone.quantity = dto.quantity;
    phone.status = StatusEnum.ACTIVE;

    const url = await this.uploadFile(dto.image);
    phone.image = url;

    return await this.phoneRepository.create(phone);
  }

  async uploadFile(file: any): Promise<string> {
    const formData = new FormData();
    formData.append('files', Readable.from(file.buffer), {
      filename: file.originalname,
    });

    try {
      const response = await axios({
        url: 'https://api-upload-file.handepgai.xyz',
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        data: formData,
      });
      return response.data.url[0];
    } catch (error) {
      throw new HttpException(
        'Upload image failed',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
