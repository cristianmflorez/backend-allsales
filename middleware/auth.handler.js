const UserService = require('./../services/users.service');
const ProducstService = require('./../services/products.service');
const userService = new UserService();
const productService = new ProducstService();
const jwt = require('jsonwebtoken');
const {config} = require('./../config/config');
const fs = require('fs');

async function isLogin(req,res,next){
    const token = req.body.token;
    if (!token) return res.status(401).json('Sesión no iniciada')
    try {
        const payload = jwt.verify(token, config.jwtSecret);
        req.user = await userService.findOne(payload.sub);
        next()
    } catch (error) {
        res.status(400).json({error: 'token no es válido'})
    }
}

async function isOwnerProduct(req,res,next) {
    const { id } = req.params;
    const product = await productService.findOne(id);
    const token = req.body.token;
    if (!token) return res.status(401).json({ error: 'Debe iniciar sesión' });
    try {
        const payload = jwt.verify(token, config.jwtSecret);
        req.user = await userService.findOne(payload.sub);
        if(req.user.id!==product.userId){
            return res.status(401);
        }
        next()
    } catch (error) {
        res.status(400).json({error: 'Acceso denegado'});
    }
}

async function isOwnerProfile(req,res,next){
    const { id } = req.params;
    const profile = await userService.findOne(id);
    const token = req.body.token;
    if (!token) return res.status(401).json({ error: 'Debe iniciar sesión' });
    try {
        const payload = jwt.verify(token, config.jwtSecret);
        req.user = await userService.findOne(payload.sub);
        if(req.user.id!==profile.id){
            return res.status(401).json({ error: 'Problema de autenticación' });
        }
        next()
    } catch (error) {
        res.status(400).json({error: 'Acceso denegado'});
    }
}

async function isUniqueEmail(req,res,next){
    const email = req.body.email;
    try {
        const user = await userService.findByEmail(email);
        if(user!==null){
            fs.unlinkSync('images/users/' + req.file.filename);
            return res.json('El email ya está en uso');
        }
        next()
    } catch (error) {
        res.status(400).json('Sesión no iniciada');
    }
}

module.exports = {isLogin, isOwnerProduct, isOwnerProfile, isUniqueEmail};