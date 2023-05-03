const express = require('express');
const jwt = require('jsonwebtoken');
const {config} = require('./../config/config');
const ProductsService = require('./../services/products.service');
const validatorHandler = require('./../middleware/validator.handler');
const { createProductSchema, updateProductSchema, getProductSchema} = require('./../schemas/product.schema');
const {isLogin, isOwnerProduct} = require('./../middleware/auth.handler');
const UserService = require('./../services/users.service');
const userService = new UserService();
const bcrypt = require('bcrypt');
const uploadFile = require('./../middleware/multerProduct.handler');

const router = express.Router();
const service = new ProductsService();

router.post('/',
  uploadFile.array('image'),
  isLogin,
  validatorHandler(createProductSchema, 'body'),
  async (req, res, next) => { 
      const body = req.body;
    try {
      await service.create(body, req.files);
      res.status(201).json('Producto creado correctamente');
    } catch (error) {
      res.json('Algo salio mal');
    }
  }
);

router.post('/:id',
  validatorHandler(getProductSchema, 'params'),
    async (req, res, next) => {

    let isOwner = false;

    try {
      const { id } = req.params;
      const rta = await service.findOne(id);
      const token = req.body.token;
      if (token) {
        const payload = jwt.verify(token, config.jwtSecret);
        isOwner = (rta.user.id === payload.sub);
      }
      res.json({rta, isOwner:isOwner});
    } catch (error) {
      next(error);
    }
  }
);

router.patch('/:id',
uploadFile.array('image'),
isOwnerProduct,
validatorHandler(getProductSchema, 'params'),
validatorHandler(updateProductSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      await service.update(id, body, req.files);
      res.json('Producto editado con éxito');
    } catch (error) {
      res.json('Algo salio mal');
    }
  }
);

router.delete('/:id',
  isOwnerProduct,
  async (req, res, next) => {
    try {
      const password = req.body.password;

      const token = req.body.token;
      const payload = jwt.verify(token, config.jwtSecret);
      const user = await userService.findOne(payload.sub);

      const isMatch = await bcrypt.compare(password, user.password);

      if(isMatch===true){
        const { id } = req.params;
        await service.delete(id);
        res.status(201).json('Producto eliminado con éxito');
      }else{
        res.json('Contraseña incorrecta');
      }
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;