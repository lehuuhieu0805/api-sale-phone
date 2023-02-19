import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import axios from 'axios';
import * as FormData from 'form-data';
import { Readable } from 'stream';
import { CreatePhoneDto } from './dto/createPhone.dto';
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

    const formData = new FormData();
    formData.append('files', Readable.from(dto.image.buffer), {
      filename: dto.image.originalname,
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
      phone.image = response.data.url[0];
    } catch (error) {
      throw new HttpException(
        'Upload image failed',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return await this.phoneRepository.create(phone);
  }
}
