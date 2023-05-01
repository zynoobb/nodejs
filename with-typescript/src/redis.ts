import redis, { RedisClientOptions } from "redis";
import dotenv from "dotenv";
import * as redisStore from "cache-manager-redis-store";
dotenv.config();

const redisOptions: RedisClientOptions = {
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  store: redisStore,
  url: process.env.REDIS_URL,
  isGlobal: true,
};

export const redisClient = redis.createClient(redisOptions);
