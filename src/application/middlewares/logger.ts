import pino from 'pino';

const logger = pino({
  enabled: process.env.LOG_LEVEL !== "",
  level: process.env.LOG_LEVEL || 'info',
  prettyPrint: true,
});

export { logger };
