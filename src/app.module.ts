import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './components/user/user.module';
import { dataSourceOptions } from './config/data-source.config';
import { AuthModule } from './components/auth/auth.module';
import { PhoneModule } from './components/phone/phone.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(dataSourceOptions),
    UserModule,
    AuthModule,
    PhoneModule,
  ],
})
export class AppModule {}
