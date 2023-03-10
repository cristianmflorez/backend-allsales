const boom = require('@hapi/boom');
const {models} = require('./../libs/sequelize');
const fs = require('fs');

class ComentService{
    constructor(){
        //
    }

    async create(data, user) {
        data = {
            ...data,
            coment: data.text,
            userId: user.id,
            userName: user.name,
            userImage: user.image
        }
        const newComent = await models.Coment.create(data);

        return newComent;
    }

    async getComents(id) {
        const coments = await models.Coment.findAll({
          where: {productId: id},
          include: ['user']
        });
        return coments;
    }

    async delete(id) {
        await models.Coment.destroy({
          where:{id}
        });
        return { id };
    }
}

module.exports = ComentService;