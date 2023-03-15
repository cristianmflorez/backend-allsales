const {Model, DataTypes, Sequelize} = require('sequelize');

const USER_TABLE = 'users';

const UserSchema = {
  id: {
    allowNule: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  name:{
    allowNule: false,
    type: DataTypes.STRING,
  },
  email:{
    allowNule: false,
    type: DataTypes.STRING,
    unique: true,
  },
  password: {
    allowNule: false,
    type: DataTypes.STRING,
  },
  description:{
    allowNule: false,
    type: DataTypes.TEXT,
  },
  image: {
    allowNule: false,
    type: DataTypes.STRING
  },
  createdAt: {
    allowNule: false,
    type: DataTypes.DATE,
    field: 'create_at',
    defaultValue: Sequelize.NOW,
  }

}

class User extends Model {
    
    static associate(models) {
        this.hasMany(models.Product, {
            as: 'products',
            foreignKey: 'userId',
        });
        this.hasMany(models.Coment, {
          as: 'coment',
          foreignKey: 'userId'
        })
    }
  
    static config(sequelize){
      return{
        sequelize,
        tableName: USER_TABLE,
        modelName: 'User',
        timestamps: false,
      }
    }
    
}

module.exports = {USER_TABLE, UserSchema, User};