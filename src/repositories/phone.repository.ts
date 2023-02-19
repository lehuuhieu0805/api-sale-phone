import { Phone } from './../components/phone/phone.entity';
import { Injectable } from '@nestjs/common';
import { IPhoneRepository } from './../components/phone/interfaces/phone.repository.interface';
import { BaseAbstractRepository } from './base/base.abstract.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { UpdatePhoneDto } from 'src/components/phone/dto/updatePhone.dto';

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
}
