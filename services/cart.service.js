const boom = require('@hapi/boom');
const { models} = require('./../libs/sequelize');
const {Op} = require('sequelize');
const sequelize = require('sequelize');

class CartService{
    constructor(){
        //
    }

    async buy(arreglo) {

      if(arreglo.length>0){
        arreglo.map(async (id) =>{
            let product = await models.Product.findByPk(id);
            let changes = {amount:product.amount-1};
            await product.update(changes ,{
                where:{id}
              })
        })
        
        return 'Compra realizada'
      }else{
        return 'No hay productos en el carrito'
      }
  }

}

module.exports = CartService;