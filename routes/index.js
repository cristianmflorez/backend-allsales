const express = require('express');

const usersRouter = require('./users.router');
const productsRouter = require('./products.router');
const filterRouter = require('./filters.router');
const authRouter = require('./auth.router');
//const ownerRouter = require('./isOwner.router');
const cartRouter = require('./cart.router');
const comentRouter = require('./coment.router');

function routerApi(app){
    const router = express.Router();
    app.use(router);
    router.use('/profile', usersRouter);
    router.use('/product', productsRouter);
    router.use('/filter', filterRouter);
    router.use('/login', authRouter);
    //router.use('/isOwner', ownerRouter);
    router.use('/buy', cartRouter);
    router.use('/coment', comentRouter);
}

module.exports = routerApi;