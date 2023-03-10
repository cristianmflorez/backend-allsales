const boom = require('@hapi/boom');
const { models} = require('./../libs/sequelize');
const {Op} = require('sequelize');
const sequelize = require('sequelize');

class FiltersService{
    constructor(){
        //
    }

    async filterCategory(id) {
        const products = await models.Product.findAll({
          where: {categoryId: id}
        });
        const categoryName = await models.Category.findByPk(id);
        if(!products){
          throw boom.notFound('Category not found');
        }
        return {products, categoryName};
    }

    async filterUser(id) {
        const products = await models.Product.findAll({
          where: {userId: id}
        });
        if(!products){
          throw boom.notFound('El usuario aún no tiene productos a la venta');
        }
        return products;
    }

    async search(name) {
        const products = await models.Product.findAll({
            where: {name: { [Op.like]: '%' + name + '%' } }
        });
        if(!products){
          throw boom.notFound('Busqueda sin resultados');
        }
        return products;
    }

    async discount() {
        const products = await models.Product.findAll({
            where: {discount: { [Op.gt]: 0 } },
            order: [['createdAt', 'DESC']]
        });
        if(!products){
          throw boom.notFound('Busqueda sin resultados');
        }
        return products;
    }

    async lastAdds() {
        const products = await models.Product.findAll({
            order: [['createdAt', 'DESC']]
        });
        if(!products){
          throw boom.notFound('Busqueda sin resultados');
        }
        return products;
    }

    async recentViews(arreglo) {

      let products = [];
      for(let id of arreglo){
        products.push(await models.Product.findByPk(id))
      }

      return products;
  }

}

module.exports = FiltersService;