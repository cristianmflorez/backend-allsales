const { User, UserSchema } = require('./user.model');
const { Category, CategorySchema } = require('./category.model');
const { Product, ProductSchema } = require('./product.model');
const { Coment, ComentSchema } = require('./coment.model');

function setupModels(sequelize){
  User.init(UserSchema, User.config(sequelize));
  Product.init(ProductSchema, Product.config(sequelize));
  Category.init(CategorySchema, Category.config(sequelize));
  Coment.init(ComentSchema, Coment.config(sequelize));


  
  User.associate(sequelize.models);
  Product.associate(sequelize.models);
  Category.associate(sequelize.models);
  Coment.associate(sequelize.models);

}

module.exports = setupModels;