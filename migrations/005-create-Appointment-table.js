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
          model: 'Users', // Make sure this matches your actual model name
          key: 'id'
        }
      },
      EventCoordinatorID: {
        type: Sequelize.UUID, 
        allowNull: false,
        references: {
          model: 'EventCoordinator', 
          key: 'id'
        }
      },
      notes: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      status: {
        type: Sequelize.ENUM('BOOK', 'PENDING','CANCEL'),
        allowNull: false,
        defaultValue: 'PENDING'
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
