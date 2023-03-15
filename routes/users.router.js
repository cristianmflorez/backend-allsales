const express = require('express');
const jwt = require('jsonwebtoken');
const {config} = require('./../config/config');
const UsersService = require('./../services/users.service');
const validatorHandler = require('./../middleware/validator.handler');
const { updateUserSchema, createUserSchema, getUserSchema } = require('./../schemas/user.schema');
const {isOwnerProfile, isUniqueEmail} = require('./../middleware/auth.handler');
const bcrypt = require('bcrypt');
const uploadFile = require('./../middleware/multerUser.handler');

const router = express.Router();
const service = new UsersService();

router.post('/',
  uploadFile.single('image'),
  isUniqueEmail,
  validatorHandler(createUserSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      await service.create(body, req.file);
      res.status(201).json("Usuario creado exitosamente");
    } catch (error) {
      next(error);
    }
  }
);

router.post('/user/:id',
    validatorHandler(getUserSchema, 'params'),
    async (req, res, next) => {
    
      let isOwner = false;
      const token = req.body.token;
    try {
      const { id } = req.params;
      const rta = await service.findOne(id);

      if (token) {
        const payload = jwt.verify(token, config.jwtSecret);
        isOwner = (rta.id === payload.sub);
        
      }

      res.json({rta, isOwner:isOwner});
    } catch (error) {
      next(error);
    }
  }
);

router.post('/header',
    async (req, res, next) => {
    try {
      const token = req.body.token;
      if (token) {
        const payload = jwt.verify(token, config.jwtSecret);
        let id = payload.sub;
        const rta = await service.findOne(id);
        res.json(rta);
      }
    } catch (error) {
      next(error);
    }
  }
);

router.patch('/:id',
  uploadFile.single('image'),
  isOwnerProfile,
  validatorHandler(getUserSchema, 'params'),
  validatorHandler(updateUserSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      await service.update(id, body, req.file);
      res.json('Perfil editado con éxito');
    } catch (error) {
      next(error);
    }
  }
);

router.delete('/:id',
  isOwnerProfile,
  async (req, res, next) => {
    try {
      const password = req.body.password;

      const token = req.body.token;
      const payload = jwt.verify(token, config.jwtSecret);
      const user = await service.findOne(payload.sub);

      const isMatch = await bcrypt.compare(password, user.password);

      if(isMatch===true){
        const { id } = req.params;
        await service.delete(id);
        res.status(201).json('Usuario eliminado con éxito');
      }else{
        res.json('Contraseña incorrecta');
      }
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;