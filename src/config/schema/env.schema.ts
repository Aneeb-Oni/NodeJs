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
  // EMAIL_HOST: Joi.string().required().description('EMAIL_HOST'),
  // EMAIL_PORT: Joi.string().required().description('EMAIL_PORT'),
  // EMAIL_USER: Joi.string().required().description('EMAIL_USER'),
  // EMAIL_PASS: Joi.string().required().description('EMAIL_PASS'),
  // EMAIL_FROM: Joi.string().required().description('EMAIL_FROM'),

  ///////////////////
  SMTP_EMAIL: Joi.string().required().description('SMTP email'),
  AWS_SES_REGION: Joi.string().required().description('AWS_SES_REGION'),
  AWS_SES_ACCESS_KEY: Joi.string().required().description('AWS_SES_ACCESS_KEY'),
  AWS_SES_KEY_SECRET: Joi.string().required().description('AWS_SES_KEY_SECRET'),
  AWS_SES_SMTP_HOST: Joi.string().required().description('AWS_SES_SMTP_HOST'),
  AWS_SES_SMTP_PORT: Joi.string().required().description('AWS_SES_SMTP_PORT'),
  AWS_SES_SMTP_USER_NAME: Joi.string()
      .required()
      .description('AWS_SES_SMTP_USER_NAME'),
  AWS_SES_SMTP_USER_PASSWORD: Joi.string()
      .required()
      .description('AWS_SES_SMTP_USER_PASSWORD'),

});
