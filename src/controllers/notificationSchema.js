import Joi from 'joi';

const schema = Joi.object().keys({
  title: Joi.string().required(),
  message: Joi.string().required(),
  token: Joi.string().required(),
  project: Joi.string().required(),
});

export default schema;
