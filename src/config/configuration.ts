import { registerAs } from '@nestjs/config';

export default registerAs('configuration', () => {
  return {
    port: parseInt(process.env.PORT, 10) || 3000,
    database: {
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
      name: process.env.DATABASE_NAME,
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
    },
    sentry: {
      dsn: process.env.SENTRY_DSN,
    },
  };
});
