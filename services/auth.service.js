const UserService = require('./users.service');
const service = new UserService();
const boom = require('@hapi/boom');
//const nodemailer = require("nodemailer");
const jwt = require('jsonwebtoken');
const {config} = require('./../config/config');
const bcrypt = require('bcrypt');

class AuthService{
  async getUser(email, password){
    const user = await service.findByEmail(email);
    if(!user){
      return ("Email o contraseña no valida");
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch){
      return ("Email o contraseña no valida");
    }
    return user.dataValues;
  }

  async login(user){
    const payload = {
        sub: user.id,
    };
    const token = jwt.sign(payload, config.jwtSecret);
    return token;
  }
}

module.exports = AuthService;