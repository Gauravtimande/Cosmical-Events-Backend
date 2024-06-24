"use strict";


module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("EventServicesBooking", {
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
        Start_date: {
            type: Sequelize.TEXT,
            allowNull: true
        },
        End_date: {
            type: Sequelize.TEXT,
            allowNull: true
        },
        Start_date: {
            type: Sequelize.JSON,
            allowNull: true
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
    await queryInterface.dropTable("EventServicesBooking");
  }
};
