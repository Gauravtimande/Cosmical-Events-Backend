"use strict";


module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Services", {
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
          ServiceCategory_ID: {
            type: Sequelize.BIGINT, 
            allowNull: false,
            references: {
              model: "Categories", 
              key: "id"
            }
          },
          ServiceName: {
            type: Sequelize.TEXT,
            allowNull: true
          },
          ServiceDescription: {
            type: Sequelize.TEXT,
            allowNull: true
          },
          StartpriceRange: {
            type: Sequelize.STRING,
            allowNull: true
          },
          EndpriceRange: {
            type: Sequelize.STRING,
            allowNull: true
          },
          image: {
            type: Sequelize.JSONB,
            allowNull: false
          },
          Video: {
            type: Sequelize.JSONB,
            allowNull: false
          },
          Rating: {
            type: Sequelize.TEXT,
            allowNull: false
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

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("VendorServices");
  }
};
