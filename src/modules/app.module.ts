import { Module } from '@nestjs/common';
import * as redisStore from 'cache-manager-redis-store';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CacheModule } from '@nestjs/cache-manager';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { User } from './users/schema/user.schema';
import { AsynchronousOperationsModule } from './asynchronous-operations/asynchronous-operations.module';
import {HttpErrorInterceptor} from "../../interceptor/http-error.interceptor";
import {APP_INTERCEPTOR} from "@nestjs/core";
import {AsynchronousOperationsService} from "./asynchronous-operations/asynchronous-operations.service";
import {HttpModule} from "@nestjs/axios";
import { ApiFetchModule } from './api-fetch/api-fetch.module';
import { FileListingModule } from './file-listing/file-listing.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    HttpModule,
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      expandVariables: true,
      envFilePath: ['.env'],
    }),

    CacheModule.register({
      isGlobal: true,
      store: redisStore,
      uri: process.env.REDIS_URL,
      onClientReady: async (client): Promise<void> => {
        client.on('error', console.error);
        client.on('ready', () => {
          console.log('Redis: Connection successful.');
        });
        client.on('restart', () => {
          console.log('Attempt to restart the redis server');
        });
      },
      reconnectOnError: (): boolean => true,
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('DB_HOST'),
        port: parseInt(configService.get('DB_PORT'), 10),
        username: configService.get('DB_USER'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        entities: [
          User,
        ],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),

    AsynchronousOperationsModule,
    ApiFetchModule,
    FileListingModule,
  ],
  controllers: [],
  providers: [
    AsynchronousOperationsService,
    {
      provide: APP_INTERCEPTOR,
      useClass: HttpErrorInterceptor,
    },
  ],
})
export class AppModule {}
