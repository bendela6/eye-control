import { createClient } from 'redis';
import { environment } from '../../environment';

export const redisClient = createClient({
  url: `redis://${environment.redis.host}:${environment.redis.port}`,
});
