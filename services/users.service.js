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
          await models.User.findByPk(id).then((user) => {
            fs.unlinkSync(
              'images/' + user.image
            );
          });
          changes = {...changes, image: image.filename}
        }

        
        const rta = await user.update(changes,{
          where:{id}
        })
        return rta;
    }

    async delete(id) {
        const user = await models.User.findByPk(id);
        await models.Product.findAll({
          where: {userId: id}
        }).then((products) => {
          products.map(product => {
            product.image.map(img => {
              fs.unlinkSync(
                'images/' + img
              );
            })
          })
        });
        await models.Coment.destroy({
          where: {userId: id}
        });
        await models.Product.destroy({
          where: {userId: id}
        });
        await models.User.findByPk(id).then((user) => {
          fs.unlinkSync(
            'images/' + user.image
          );
        });
        await user.destroy({
          where:{id}
        });
        return { id };
    }
}

module.exports = UsersService;