"use strict";


module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("VendorServices", {
        id: {
            type: Sequelize.BIGINT,
            autoIncrement: true,
            primaryKey: true
        },
        User_id: {
            type: Sequelize.BIGINT,
            allowNull: false,
            references: {
                model: "Users",
                key: "id"
            }
        },
        Coordinator_id: {
            type: Sequelize.BIGINT,
            allowNull: false,
            references: {
                model: "Users",
                key: "id"
            }
        },
        Event_id: {
            type: Sequelize.BIGINT,
            allowNull: false,
            references: {
                model: "Users",
                key: "id"
            }
        },
        Notes: {
            type: Sequelize.TEXT,
            allowNull: true
        },
        Date: {
            type: Sequelize.TEXT,
            allowNull: true
        },
        Time: {
            type: Sequelize.STRING,
            allowNull: true
        },
        Duration_of_meeting: {
            type: Sequelize.STRING,
            allowNull: true
        },
        Status: {
            type: Sequelize.ENUM,
            values: ['cancel', 'successful', 'pending'],
            defaultValue: 'pending',
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
