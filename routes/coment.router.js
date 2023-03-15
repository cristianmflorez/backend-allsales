const express = require('express');
const jwt = require('jsonwebtoken');
const {config} = require('./../config/config');
const ProductsService = require('./../services/products.service');
const validatorHandler = require('./../middleware/validator.handler');
const { createComentSchema} = require('./../schemas/coment.schema');
const {isLogin, isOwnerProduct} = require('./../middleware/auth.handler');
const UserService = require('./../services/users.service');
const userService = new UserService();
const ComentService = require('./../services/coment.service');
const comentService = new ComentService();
const bcrypt = require('bcrypt');
const uploadFile = require('./../middleware/multerProduct.handler');

const router = express.Router();
const ProductService = new ProductsService();

router.post('/',
  isLogin,
  validatorHandler(createComentSchema, 'body'),
  async (req, res, next) => {
    const token = req.body.token;
    const payload = jwt.verify(token, config.jwtSecret);
    const user = await userService.findOne(payload.sub);
    try {
      await comentService.create(req.body, user);   
      res.status(201).json('Comentario enviado');
    } catch (error) {
      res.json('Algo salio mal');
    }
  }
);

router.get('/:id',
    async (req, res, next) => {
    try {
      const { id } = req.params;
      const rta = await comentService.getComents(id);
      res.json(rta);
    } catch (error) {
      next(error);
    }
  }
);

router.delete('/:id',
  async (req, res, next) => {
    const { id } = req.params;
    try {
        await comentService.delete(id);
        res.status(201).json('Comentario eliminado');
      
    } catch (error) {
      next(error);
    }
  }
  
);



module.exports = router;