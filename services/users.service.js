const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const { models} = require('./../libs/sequelize');
const fs = require('fs');

class UsersService{
    constructor(){
        //
    }

    async create(data, image) {
        const hash = await bcrypt.hash(data.password, 10);
        const newUser = await models.User.create({
          ...data,
          password: hash,
          image: image.filename
        });
        delete newUser.dataValues.password;
        return newUser;
    }

    async findOne(id) {
        const user = await models.User.findByPk(id);
        if(!user){
          throw boom.notFound('User not found');
        }
        return user;
    }

    async findByEmail(email) {
      const rta = await models.User.findOne({
        where: {email}
      });
      return rta;
    }

    async update(id, changes, image) {
        const user = await models.User.findByPk(id);

        if(image!==undefined){
          changes = {...changes, image: image.filename}
        }

        
        const rta = await user.update(changes,{
          where:{id}
        })
        return rta;
    }

    async delete(id) {
        const user = await models.User.findByPk(id);
        await models.Coment.destroy({
          where: {userId: id}
        });
        await models.Product.findAll({
          where: {userId: id}
        }).then((products) => {
          products.map(async (product) => {
            await models.Coment.destroy({
              where: {productId: product.id}
            });
          })
        });
        await models.Product.destroy({
          where: {userId: id}
        });
        await user.destroy({
          where:{id}
        });
        return { id };
    }
}

module.exports = UsersService;