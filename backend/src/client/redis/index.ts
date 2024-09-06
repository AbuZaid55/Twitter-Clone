import Redis from 'ioredis'
const REDIS_CLI_COMMAND = process.env.REDIS_CLI_COMMAND || ''
export const redisClient = new Redis(REDIS_CLI_COMMAND)