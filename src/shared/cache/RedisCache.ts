import Redis, { Redis as RedisClient } from 'ioredis';
import CacheConfig from '@config/cache';

class RedisCache {
  private client: RedisClient;
  private connected: boolean;

  constructor() {
    // this.client = new Redis(CacheConfig.config.redis);

    if (!this.connected) {
      this.client = new Redis(CacheConfig.config.redis);
      this.connected = true;
    }
  }

  async save(key: string, value: any): Promise<void> {
    await this.client.set(key, JSON.stringify(value));
  }

  async recover<T>(key: string): Promise<T | null> {
    const data = await this.client.get(key);

    if (!data) {
      return null;
    }

    const parsedData = JSON.parse(data) as T;

    return parsedData;
  }

  async invalidate(key: string): Promise<void> {
    this.client.del(key);
  }
}

export default new RedisCache();
