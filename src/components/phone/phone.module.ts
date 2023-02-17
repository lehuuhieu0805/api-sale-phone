import { PHONE_SERVICE } from './interfaces/phone.service.interface';
import { PhoneRepository } from './../../repositories/phone.repository';
import { PHONE_REPOSITORY } from './interfaces/phone.repository.interface';
import { Module } from '@nestjs/common';
import { PhoneService } from './phone.service';
import { PhoneController } from './phone.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Phone } from './phone.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Phone])],
  providers: [
    { provide: PHONE_SERVICE, useClass: PhoneService },
    { provide: PHONE_REPOSITORY, useClass: PhoneRepository },
  ],
  controllers: [PhoneController],
})
export class PhoneModule {}
