const Joi = require('joi');

const email = Joi.string().email();
const password = Joi.string().min(6);

const loginSchema = Joi.object({
    email: email.required(),
    password: password.required(),
});

module.exports = { loginSchema }