'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  async up (queryInterface, Sequelize) {

    return queryInterface.bulkInsert('Permissions', [
      {
        id: 1,
        code: 'Platinum',
        description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        code: 'Gold',
        description: 't is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 3,
        code: 'Regular',
        description: 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 year',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
  ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Permissions', null, {});
  }
};
