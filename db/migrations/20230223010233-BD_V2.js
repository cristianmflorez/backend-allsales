'use strict';

const {UserSchema, USER_TABLE} = require('./../models/user.model');
const {ProductSchema, PRODUCT_TABLE} = require('./../models/product.model');
const {CategorySchema, CATEGORY_TABLE} = require('./../models/category.model');
const {ComentSchema, COMENT_TABLE} = require('./../models/coment.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable(USER_TABLE, UserSchema);
    await queryInterface.createTable(CATEGORY_TABLE, CategorySchema);
    await queryInterface.bulkInsert(CATEGORY_TABLE, [{
      id: 1,
      name: 'Vestuario'
    }, {
      id: 2,
      name: 'Tecnología'
    }, {
      id: 3,
      name: 'Hogar'
    }, {
      id: 4,
      name: 'Deportes'
    }]);
    await queryInterface.createTable(PRODUCT_TABLE, ProductSchema);
    await queryInterface.createTable(COMENT_TABLE, ComentSchema);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable(USER_TABLE);
    await queryInterface.dropTable(CATEGORY_TABLE);
    await queryInterface.bulkDelete(CATEGORY_TABLE, null, {});
    await queryInterface.dropTable(PRODUCT_TABLE);
    await queryInterface.dropTable(COMENT_TABLE);
  }
};