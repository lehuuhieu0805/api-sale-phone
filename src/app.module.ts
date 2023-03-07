import { CacheModule, CacheStore, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { redisStore } from 'cache-manager-redis-store';
import { AuthModule } from './components/auth/auth.module';
import { CartModule } from './components/cart/cart.module';
import { OrderItemModule } from './components/order-item/order-item.module';
import { OrderModule } from './components/order/order.module';
import { PhoneModule } from './components/phone/phone.module';
import { UserModule } from './components/user/user.module';
import { dataSourceOptions } from './config/data-source.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    CacheModule.registerAsync({
      isGlobal: true,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const store = await redisStore({
          socket: {
            host: configService.get('REDIS_HOST'),
            port: configService.get('REDIS_PORT'),
          },
        });

        return {
          store: store as unknown as CacheStore,
          ttl: 0,
          max: 100,
        };
      },
    }),
    TypeOrmModule.forRoot(dataSourceOptions),
    UserModule,
    AuthModule,
    PhoneModule,
    CartModule,
    OrderModule,
    OrderItemModule,
  ],
})
export class AppModule {}
