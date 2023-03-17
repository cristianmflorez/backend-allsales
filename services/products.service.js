const boom = require('@hapi/boom');
const { models} = require('./../libs/sequelize');
const fs = require('fs');

class ProductsService{
    constructor(){
        //
    }

    async create(data, images) {
        let arrImages = [];
        images.map(img=>{
          arrImages.push(img.filename)
        })
        const newProduct = await models.Product.create({...data, image:arrImages});
        return newProduct;
    }

    async findOne(id) {
        const product = await models.Product.findByPk(id,{
          include: ['category', 'user']
        });
        if(!product){
          throw boom.notFound('Product not found');
        }
        return product;
    }

    async update(id, changes, images) {
      let arrImages = [];
      images.map(img=>{
        arrImages.push(img.filename)
      });
      const product = await models.Product.findByPk(id);

      if(arrImages.length>0){
        changes = {...changes, image:arrImages};
      }
      
      const rta = await product.update(changes ,{
        where:{id}
      })
      return rta;
    }

    async delete(id) {
        const product = await models.Product.findByPk(id);
        await models.Coment.destroy({
          where: {productId: id}
        })
        await product.destroy({
          where:{id}
        });
        return { id };
    }
}

module.exports = ProductsService;