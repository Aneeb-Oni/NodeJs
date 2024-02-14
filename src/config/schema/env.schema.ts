import * as Joi from 'joi';

export const envSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test', 'local')
    .default('development')
    .description('The application environment.'),
  PORT: Joi.number().default(3000).description('Port to listen on'),
  DB_HOST: Joi.string()
    .required()
    .description('Database hostname or IP address'),
  DB_USER: Joi.string().required().description('Database username'),
  DB_PASSWORD: Joi.string().required().description('Database password'),
  DB_NAME: Joi.string().required().description('Database name'),
  DB_PORT: Joi.string().required().description('Database Port'),
  REDIS_URL: Joi.string().required().description('Redis URL'),

});
