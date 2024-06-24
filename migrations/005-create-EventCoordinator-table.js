"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('EventCoordinator', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable("EventCoordinators", {
      id: {
        type: Sequelize.BIGINT,
        autoIncrement: true,
        primaryKey: true
      },
      Coordinators_ID: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: "Users",
          key: "id"
        }
      },
      Educational_details_if_related_to_work : {
        type: Sequelize.TEXT,
        allowNull: false
      },
      Rating: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      Experience : {
        type: Sequelize.TEXT,
        allowNull: false
      },
      Small_description: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
      },
      deletedAt: {
        type: Sequelize.DATE,
        allowNull: true
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
      } 
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('EventCoordinator');
     */
    await queryInterface.dropTable("EventCoordinators");
  }
};
