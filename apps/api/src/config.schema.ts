import * as Joi from '@hapi/joi'

export const configValidationSchema = Joi.object({
  DB_HOST: Joi.string().required(),
  DB_PORT: Joi.number().default(5432),
  DB_USERNAME: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),
  DB_DATABASE: Joi.string().required(),
})

export const testConfigValidationSchema = Joi.object({
  DB_HOST: Joi.string().required(),
  TEST_DB_PORT: Joi.number().default(5433),
  DB_USERNAME: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),
  DB_DATABASE: Joi.string().required(),
})
