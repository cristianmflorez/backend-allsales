const { Model, DataTypes, Sequelize } = require('sequelize');

const {CATEGORY_TABLE} = require('./category.model');
const {USER_TABLE} = require('./user.model');

const PRODUCT_TABLE = 'products';

const ProductSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  discount: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  amount: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  image: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: false
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW,
  },
  categoryId:{
    field: 'category_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: CATEGORY_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },
  userId:{
    field: 'user_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: USER_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  }
}

class Product extends Model {

    static associate(models) {
        this.belongsTo(models.Category,{
            as: 'category'
        });
        this.belongsTo(models.User,{
            as: 'user'
        });
        this.hasMany(models.Coment, {
          as: 'coment',
          foreignKey: 'productId'
        })
    }
  
    static config(sequelize) {
      return {
        sequelize,
        tableName: PRODUCT_TABLE,
        modelName: 'Product',
        timestamps: false
      }
    }
    
}
  
  module.exports = { Product, ProductSchema, PRODUCT_TABLE };