import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdatePhoneDto } from 'src/components/phone/dto/updatePhone.dto';
import { StatusEnum } from 'src/constants/common';
import { Repository, UpdateResult } from 'typeorm';
import { IPhoneRepository } from './../components/phone/interfaces/phone.repository.interface';
import { Phone } from './../components/phone/phone.entity';
import { BaseAbstractRepository } from './base/base.abstract.repository';

@Injectable()
export class PhoneRepository
  extends BaseAbstractRepository<Phone>
  implements IPhoneRepository
{
  constructor(
    @InjectRepository(Phone)
    private readonly phoneRepository: Repository<Phone>,
  ) {
    super(phoneRepository);
  }

  async deletePhone(id: string): Promise<number> {
    const result: UpdateResult = await this.phoneRepository
      .createQueryBuilder()
      .update({
        status: StatusEnum.INACTIVE,
      })
      .where('id = :id', { id: id })
      .execute();

    return result.affected;
  }

  async updatePhone(
    id: string,
    updatePhoneDto: UpdatePhoneDto,
  ): Promise<number> {
    const result: UpdateResult = await this.phoneRepository
      .createQueryBuilder()
      .update({
        image: updatePhoneDto.image,
        name: updatePhoneDto.name,
        price: updatePhoneDto.price,
        quantity: updatePhoneDto.quantity,
        status: updatePhoneDto.status,
      })
      .where('id = :id', { id: id })
      .execute();

    return result.affected;
  }

  async getAllPhone(status: StatusEnum): Promise<Phone[]> {
    if (status) {
      return await this.phoneRepository
        .createQueryBuilder()
        .where('status = :status', { status })
        .getMany();
    } else {
      return await this.phoneRepository.find();
    }
  }
}
