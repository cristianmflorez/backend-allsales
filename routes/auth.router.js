const express = require('express');
//const jwt = require('jsonwebtoken');
const validatorHandler = require('./../middleware/validator.handler');
//const {config} = require('./../config/config');
const AuthService = require('./../services/auth.service');
const {loginSchema} = require('./../schemas/auth.schema');

const service = new AuthService();

const router = express.Router();

router.post('/',
  validatorHandler(loginSchema, 'body'),
  async (req, res, next) => {
    try {
      const user = await service.getUser(req.body.email, req.body.password);
      if(user!=='Email o contraseña no valida'){
        const token = await service.login(user);
        res.json(token);
      }else{
        res.json("Los datos no coinciden para ninguno de nuestros usuarios");
      }
      
    } catch (error) {
      next(error);
    }
});


module.exports = router;