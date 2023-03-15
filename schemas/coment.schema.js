const Joi = require('joi');

const id = Joi.number().integer();
const text = Joi.string();
const productId = Joi.number().integer();
const token = Joi.string();

const createComentSchema = Joi.object({
    text: text.required(),
    productId: productId.required(),
    token,
});

module.exports = {createComentSchema};