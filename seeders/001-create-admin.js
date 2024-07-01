'use strict';
const bcrypt = require('bcrypt');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Hash password
    const hashedPassword = await bcrypt.hash('admin@123', 10); // Replace 'adminPassword' with your actual admin password

    // Insert an admin user into the Users table
    await queryInterface.bulkInsert('Users', [{
      firstName: 'Admin',
      lastName: 'User',
      email: 'admin@gmail.com',
      password: hashedPassword,
      role: 'admin',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    // Remove the admin user
    await queryInterface.bulkDelete('Users', { email: 'admin@example.com' }, {});
  }
};
