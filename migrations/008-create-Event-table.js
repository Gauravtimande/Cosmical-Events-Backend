"use strict";


module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Event", {
        id: {
            type: Sequelize.BIGINT,
            autoIncrement: true,
            primaryKey: true
        },
        Coordinator_id: {
            type: Sequelize.BIGINT,
            allowNull: false,
            references: {
                model: "Users",
                key: "id"
            }
        },
        User_id: {
            type: Sequelize.BIGINT,
            allowNull: false,
            references: {
                model: "Users",
                key: "id"
            }
        },
        EventName: {
            type: Sequelize.TEXT,
            allowNull: true
        },
        Budget: {
            type: Sequelize.TEXT,
            allowNull: true
        },
        Description: {
            type: Sequelize.TEXT,
            allowNull: true
        },
        Proposed_Date: {
            type: Sequelize.STRING,
            allowNull: true
        },
        Start_Date: {
            type: Sequelize.STRING,
            allowNull: true
        },
        End_Date: {
            type: Sequelize.STRING,
            allowNull: true
        },
        Event_preferences_locations: {
            type: Sequelize.JSON,
            allowNull: true
        },
        Status: {
            type: Sequelize.ENUM,
            values: ['cancel', 'successful', 'pending'],
            defaultValue: 'pending',
            allowNull: false
        },
        Notes: {
            type: Sequelize.TEXT,
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
    await queryInterface.dropTable("Event");
  }
};
