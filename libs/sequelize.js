const{Sequelize} = require('sequelize');

const {config} = require('./../config/config');
const setupModels = require('./../db/models/');

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

const sequelize = new Sequelize(URI, {
  dialect: 'postgres',
  logging: true, //para ver comandos directos de sql en consola
});

setupModels(sequelize);

//no se aconseja en producción, acá se crean las tablas, se debe trabajar con migraciones
//sequelize.sync();

module.exports = sequelize;