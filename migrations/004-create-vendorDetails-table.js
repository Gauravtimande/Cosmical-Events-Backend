"use strict";

const { DataTypes } = require("sequelize");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("vendorDetails", {
      id: {
        type: Sequelize.BIGINT,
        autoIncrement: true,
        primaryKey: true
      },
      Vendor_ID: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: "Users",
          key: "id"
        }
      },
      OwnerName: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      OwnerEmail: {
        type: Sequelize.TEXT,
        allowNull: false,
        unique: true
      },
      OwnerMobile_number: {
        type: Sequelize.STRING,
        allowNull: true
      },
      OwnerGender: {
        type: Sequelize.STRING,
        allowNull: true
      },
      OwnerDOB: {
        type: Sequelize.DATE,
        allowNull: false
      },
      OwnerCity: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      BusinessName: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      BusinessCategorises: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: "Categories",
          key: "id"
        }
      },
      BusinessVerifiedStatus: {
        type: Sequelize.ENUM,
        values: ['active', 'inactive', 'pending'],
        defaultValue: 'inactive',
        allowNull: false
      },
      ServiceableAreas: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      VenderOverallRatings: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      VenderOffers: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      status: {
        type: Sequelize.BOOLEAN,
        allowNull: false
      },
      deletedAt: {
        type: Sequelize.DATE,
        allowNull: true
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("vendorDetails");
  }
};
