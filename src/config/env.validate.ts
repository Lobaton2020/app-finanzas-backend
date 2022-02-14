import Joi = require("joi");
export default Joi.object({
    NODE_ENV: Joi.string().valid('dev', 'stag', 'prod').default('dev'),
    HTTP_PORT: Joi.number().required(),
    SECRET_KEY_BEARER: Joi.string().required(),
    SECRET_KEY_BEARER_REFRESH: Joi.string().required(),

    DATABASE_NAME: Joi.string().required(),
    DATABASE_PORT: Joi.number().required(),
    DATABASE_USER: Joi.string().required(),
    DATABASE_PASSWORD: Joi.string().required(),
    DATABASE_HOST: Joi.string().required(),
    DATABASE_DRIVER: Joi.string().required(),

})