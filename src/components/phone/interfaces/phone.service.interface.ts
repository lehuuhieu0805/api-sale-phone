import { Phone } from './../phone.entity';
import { CreatePhoneDto } from './../dto/createPhone.dto';
export const PHONE_SERVICE = 'PHONE SERVICE';

export interface IPhoneService {
  create(dto: CreatePhoneDto): Promise<Phone>;
}
