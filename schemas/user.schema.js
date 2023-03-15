const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string().min(5);
const email = Joi.string().email();
const password = Joi.string().min(6);
const image = Joi.string();
const description = Joi.string();
const token = Joi.string();

const createUserSchema = Joi.object({
    name: name.required(),
    email: email.required(),
    password: password.required(),
    description: description.required(),
});

const updateUserSchema = Joi.object({
    name,
    password,
    image,
    description,
    token,
});

const getUserSchema = Joi.object({
  id: id.required(),
});

module.exports = { createUserSchema, updateUserSchema, getUserSchema }