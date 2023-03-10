const {Model, DataTypes} = require('sequelize');

const CATEGORY_TABLE = 'categories';

const CategorySchema = {
  id: {
    allowNule: false,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  name:{
    allowNule: false,
    type: DataTypes.STRING,
  }
}

class Category extends Model {

    static associate(models) {
      this.hasMany(models.Product, {
        as: 'products',
        foreignKey: 'categoryId'
      })
    }
  
    static config(sequelize) {
      return {
        sequelize,
        tableName: CATEGORY_TABLE,
        modelName: 'Category',
        timestamps: false
      }
    }
    
}
  
module.exports = { Category, CategorySchema, CATEGORY_TABLE };