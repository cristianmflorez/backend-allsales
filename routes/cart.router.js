const express = require('express');

const CartService = require('./../services/cart.service');
const {isLogin} = require('./../middleware/auth.handler');

const router = express.Router();
const service = new CartService();

router.post('/',
    isLogin,
    async (req, res, next) => {
    let products = req.body.ids;
    try {
      
      const rta = await service.buy(products);
      res.json(rta);
    } catch (error) {
        res.json('Algo salio mal');
    }
  }
);

module.exports = router;