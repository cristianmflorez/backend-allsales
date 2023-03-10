const Joi = require('joi');

const id = Joi.number().integer();
const text = Joi.string();
const productId = Joi.number().integer();

const createComentSchema = Joi.object({
    text: text.required(),
    productId: productId.required(),
});

module.exports = {createComentSchema};