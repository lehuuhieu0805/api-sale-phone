import { Phone } from './../components/phone/phone.entity';
import { Injectable } from '@nestjs/common';
import { IPhoneRepository } from './../components/phone/interfaces/phone.repository.interface';
import { BaseAbstractRepository } from './base/base.abstract.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

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
}
