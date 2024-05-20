import { getEnv } from '@utils';

export const environment = {
  host: getEnv('HOST', 'localhost'),
  port: Number(getEnv('PORT', '9000')),
  redis: {
    host: getEnv('REDIS_HOST', 'localhost'),
    port: getEnv('REDIS_PORT', '6379'),
  },
  database: {
    type: getEnv('DATABASE_TYPE', 'postgres'),
    host: getEnv('DATABASE_HOST', 'localhost'),
    port: Number(getEnv('DATABASE_PORT', '5432')),
    username: getEnv('DATABASE_USERNAME', 'postgres'),
    password: getEnv('DATABASE_PASSWORD', 'postgres'),
    database: getEnv('DATABASE_DATABASE', 'postgres'),
  },
} as const;
