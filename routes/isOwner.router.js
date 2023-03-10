/*const express = require('express');

const ProductsService = require('./../services/products.service');

const validatorHandler = require('./../middleware/validator.handler');
const {getProductSchema} = require('./../schemas/product.schema');

const router = express.Router();
const service = new ProductsService();

router.post('/:id',
  validatorHandler(getProductSchema, 'params'),
    async (req, res, next) => {
    let isOwner = false;
    try {
      const { id } = req.params;
      const rta = await service.findOne(id);
      const token = req.body.document.cookie.auth;
      if (token) {
        const payload = jwt.verify(token, config.jwtSecret);
        isOwner = (rta.user.id === payload.sub);
        console.log(rta.user.id +' ---------------- ' + payload.sub);
      }
      console.log(token)
      res.json(isOwner);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
*/