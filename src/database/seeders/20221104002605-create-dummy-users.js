'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  async up (queryInterface, Sequelize) {

    return queryInterface.bulkInsert('user', [
      {
        uuid: '956b086d-f22d-43a3-8966-77d412555c3e',
        permissionId: 1,
        firstName: 'Petar',
        lastName: 'Petrovic',
        username: 'petar80',
        password: await bcrypt.hash("test123", 12),
        email: 'petar@gmail.com',
        status: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        uuid: '8b85d6f8-02ef-47d3-ab3c-f8074cbaf26e',
        permissionId: 2,
        firstName: 'Kristina',
        lastName: 'Markovic',
        username: 'kristina_ma',
        password: await bcrypt.hash("test123", 12),
        email: 'kristina@gmail.com',
        status: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
  ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('user', null, {});
  }
};
