import { Phone } from '../phone.entity';
import { IBaseRepository } from './../../../repositories/base/base.interface.repository';
export const PHONE_REPOSITORY = 'PHONE REPOSITORY';

export interface IPhoneRepository extends IBaseRepository<Phone> {}
