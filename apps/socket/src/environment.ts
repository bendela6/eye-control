import { getEnv } from '@utils';

export const environment = {
  port: Number(getEnv('PORT', '9100')),
  redis: {
    host: getEnv('REDIS_HOST', 'localhost'),
    port: getEnv('REDIS_PORT', '6379'),
  },
} as const;
