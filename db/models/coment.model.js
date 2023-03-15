const {Model, DataTypes, Sequelize} = require('sequelize');

const {USER_TABLE} = require('./user.model');
const {PRODUCT_TABLE} = require('./product.model');

const COMENT_TABLE = 'coments';

const ComentSchema = {
  id: {
    allowNule: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
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
  },
  userName: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  userImage: {
    allowNule: false,
    type: DataTypes.STRING
  },
  productId:{
    field: 'product_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: PRODUCT_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },
  coment: {
    type: DataTypes.TEXT,
    allowNull: false
  }
}

class Coment extends Model {
    
        static associate(models) {
          this.belongsTo(models.Product,{
            as: 'product'
          });
          this.belongsTo(models.User,{
            as: 'user'
          });
        }
      
        static config(sequelize) {
          return {
            sequelize,
            tableName: COMENT_TABLE,
            modelName: 'Coment',
            timestamps: false
          }
        }
        
    }
      
module.exports = { Coment, ComentSchema, COMENT_TABLE };