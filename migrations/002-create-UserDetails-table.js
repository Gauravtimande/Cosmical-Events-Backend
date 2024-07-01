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
    await queryInterface.createTable("UserDetails", {
        id: {
            type: Sequelize.BIGINT,
            autoIncrement: true,
            primaryKey: true
          },
          userID: {
            type: Sequelize.BIGINT,
            allowNull: false,
            references: {
              model: "Users",
              key: "id"
            }
          },
          City: {
            type: Sequelize.TEXT,
            allowNull: false
          },
          PinCode: {
            type: Sequelize.TEXT,
            allowNull: false,
            unique: true
          },
          DOB: {
            type: Sequelize.DATE,
            allowNull: false
          },
          Gender: {
            type: Sequelize.STRING,
            allowNull: true
          },
          Mobile: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
          },
          Email: {
            type: Sequelize.TEXT,
            allowNull: true
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
    await queryInterface.dropTable('UserDetails');
   
  }
};
