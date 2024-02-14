import * as Redis from 'ioredis';
import { Inject, Injectable } from '@nestjs/common';
import { RedisService } from 'nestjs-redis';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export default class AuthRepository {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  public async addRefreshToken(key: string, token: string): Promise<void> {
    await this.cacheManager.set(key, token, {
      ttl: Number(process.env.JWT_REFRESH_EXPIRY),
    });
  }

  public async setForgetToken(key: any, value: any): Promise<'OK' | null> {
    return this.cacheManager.set(key, value, {
      ttl: Number(process.env.JWT_EXPIRY),
    });
  }

  public getForgetToken(key: string): Promise<string | null> {
    return this.cacheManager.get(key);
  }

  public getToken(key: string): Promise<string | null> {
    return this.cacheManager.get(key);
  }

  public removeToken(key: string): Promise<number> {
    return this.cacheManager.del(key);
  }

  public removeAllTokens(): Promise<any> {
    return this.cacheManager.reset();
  }
}
