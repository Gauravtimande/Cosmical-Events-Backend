"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('User', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable("Categories", {
        id: {
            type: Sequelize.BIGINT,
            autoIncrement: true,
            primaryKey: true
          },
          Name: {
            type: Sequelize.TEXT,
            allowNull: false
          },
          status: {
            type: Sequelize.BOOLEAN,
            defaultValue: true
          },
          deletedAt: {
            type: Sequelize.DATE,
            allowNull: true
          },
          createdAt: {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
          },
          updatedAt: {
            type: Sequelize.DATE,
            allowNull: false
          }
    });
  },

  async down(queryInterface, Sequelize) {
   
  }
};
