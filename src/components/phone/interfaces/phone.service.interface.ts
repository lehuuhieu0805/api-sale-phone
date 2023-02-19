import { Phone } from './../phone.entity';
import { CreatePhoneDto } from './../dto/createPhone.dto';
import { UpdatePhoneDto } from '../dto/updatePhone.dto';
export const PHONE_SERVICE = 'PHONE SERVICE';

export interface IPhoneService {
  create(dto: CreatePhoneDto): Promise<Phone>;
  getById(id: string): Promise<Phone>;
  getAll(): Promise<Phone[]>;
  update(id: string, dto: UpdatePhoneDto): Promise<Phone>;
  delete(id: string): Promise<void>;
}
