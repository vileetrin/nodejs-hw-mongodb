import Joi from 'joi';

export const contactSchema = Joi.object({
  name: Joi.string().min(3).max(20).required().messages({
    'string.base': 'Name should be a string',
    'string.min': 'Name should be at least {#limit}',
    'string.max': 'Name should be at most {#limit}',
    'any.required': 'Name is required',
  }),
  phoneNumber: Joi.string().min(3).max(20).required().messages({
    'string.base': 'Phone number should be a string',
    'string.min': 'Phone number should be at least {#limit}',
    'string.max': 'Phone number should be at most {#limit}',
    'any.required': 'Phone number is required',
  }),
  email: Joi.string().email().messages({
    'string.base': 'Please, enter a valid email',
  }),
  isFavourite: Joi.boolean().messages({
    'boolean.base': 'Favourite field should be a boolean',
  }),
  contactType: Joi.string()
    .valid('home', 'work', 'personal')
    .required()
    .messages({
      'string.base': 'Contact type should be a string',
      'any.only': 'Contact type must be one of the listed: work, home, persolal',
      'any.required': 'Contact type is required',
    }),
});


export const updateContactSchema = Joi.object({
  name: Joi.string().min(3).max(20).messages({
    'string.base': 'Name should be a string',
    'string.min': 'Name should be at least {#limit}',
    'string.max': 'Name should be at most {#limit}',
  }),
  phoneNumber: Joi.string().min(3).max(20).messages({
    'string.base': 'Phone number should be a string',
    'string.min': 'Phone number should be at least {#limit}',
    'string.max': 'Phone number should be at most {#limit}',
  }),
  email: Joi.string().email().messages({
    'string.base': 'Please, enter a valid email',
  }),
  isFavourite: Joi.boolean().messages({
    'boolean.base': 'Favourite field should be a boolean',
  }),
  contactType: Joi.string()
    .valid('home', 'work', 'personal')
    .messages({
      'string.base': 'Contact type should be a string',
      'any.only': 'Contact type must be one of the listed: work, home, persolal',
    }),
});
