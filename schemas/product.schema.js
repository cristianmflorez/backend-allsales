const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string().min(3).max(50);
const price = Joi.number().integer().min(10);
const discount = Joi.number();
const categoryId = Joi.number().integer();
const userId = Joi.number().integer();
const amount = Joi.number().integer();
const description = Joi.string().min(10);
const image = Joi.any();
const token = Joi.string();

const createProductSchema = Joi.object({
  name: name.required(),
  price: price.required(),
  discount,
  categoryId: categoryId.required(),
  userId: userId.required(),
  amount: amount.required(),
  description: description.required(),
  token,
});

const updateProductSchema = Joi.object({
    name,
    price,
    discount,
    categoryId,
    amount,
    description,
    image,
    token,
});

const getProductSchema = Joi.object({
  id: id.required(),
});

module.exports = { createProductSchema, updateProductSchema, getProductSchema }