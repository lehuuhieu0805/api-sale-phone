import { Phone } from '../phone.entity';
import { StatusEnum } from './../../../constants/common';
import { IBaseRepository } from './../../../repositories/base/base.interface.repository';
import { UpdatePhoneDto } from './../dto/updatePhone.dto';
export const PHONE_REPOSITORY = 'PHONE REPOSITORY';

export interface IPhoneRepository extends IBaseRepository<Phone> {
  updatePhone(id: string, updatePhoneDto: UpdatePhoneDto): Promise<number>;
  deletePhone(id: string): Promise<number>;
  getAllPhone(status: StatusEnum): Promise<Phone[]>;
}
