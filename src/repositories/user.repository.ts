import { IUserRepository } from './../components/user/interfaces/user.repository.interface';
import { User } from './../components/user/user.entity';
import { Injectable } from '@nestjs/common';
import { BaseAbstractRepository } from './base/base.abstract.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserRepository
  extends BaseAbstractRepository<User>
  implements IUserRepository
{
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {
    super(userRepository);
  }

  async getUserByUsername(username: string): Promise<User> {
    return await this.userRepository.findOneBy({ username });
  }
  async updatePassword(id: string, password: string): Promise<void> {
    await this.userRepository
      .createQueryBuilder()
      .update({ password })
      .where('id = :id', { id })
      .execute();
  }
}
