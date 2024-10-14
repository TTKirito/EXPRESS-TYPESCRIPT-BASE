import redis from "ioredis";
import { IRedis } from "./types/interface/Redis";
import { TInputParameterRedis } from "./types/type/Redis";

export default class RedisProvider implements IRedis<TInputParameterRedis> {
  protected client;

  static instance: RedisProvider;

  static getInstance() {
    if (!RedisProvider.instance) {
      RedisProvider.instance = new RedisProvider();
    }
    return RedisProvider.instance;
  }

  constructor() {
    this.client = new redis(process.env.REDIS_URL)
  }

  save<I extends { key: string; value?: any; expires: number; }>({ value, key, expires = Number(process.env.REDIS_EXPIRES) }: I): void {
    value = JSON.stringify(value);
    this.client.set(key, JSON.stringify(value), 'EX', expires)
  }

  async getKey<I extends { key: string; value?: any; expires?: number | undefined }>({
    key,
  }: I) {
    const data = await this.client.get(key);
    return JSON.parse(data);
  }
}
