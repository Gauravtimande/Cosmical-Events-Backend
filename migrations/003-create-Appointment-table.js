'use strict';
const { DataTypes } = require("sequelize"); // Import DataTypes from Sequelize

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Appointment', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      userID: {
        type: Sequelize.UUID, // Change back to INTEGER if your User ID is of type INTEGER
        allowNull: false,
        references: {
          model: 'User', // Make sure this matches your actual model name
          key: 'id'
        }
      },
      vendorID: {
        type: Sequelize.UUID, 
        allowNull: false,
        references: {
          model: 'User', 
          key: 'id'
        }
      },
      fullName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false
      },
      mobileNo: {
        type: Sequelize.STRING,
        allowNull: false
      },
      notes: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      status: {
        type: Sequelize.ENUM('Book', 'Cancel'),
        allowNull: false,
        defaultValue: 'Book'
      },
      is_deleted: {
        type: DataTypes.BOOLEAN, // Use DataTypes here instead of Sequelize
        defaultValue: false
      },
      createdAt: {
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Appointment');
  }
};
