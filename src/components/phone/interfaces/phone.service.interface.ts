import { UpdatePhoneDto } from '../dto/updatePhone.dto';
import { StatusEnum } from './../../../constants/common';
import { CreatePhoneDto } from './../dto/createPhone.dto';
import { Phone } from './../phone.entity';
export const PHONE_SERVICE = 'PHONE SERVICE';

export interface IPhoneService {
  create(dto: CreatePhoneDto): Promise<Phone>;
  getById(id: string): Promise<Phone>;
  getAll(status: StatusEnum): Promise<Phone[]>;
  update(id: string, dto: UpdatePhoneDto): Promise<Phone>;
  delete(id: string): Promise<void>;
}
