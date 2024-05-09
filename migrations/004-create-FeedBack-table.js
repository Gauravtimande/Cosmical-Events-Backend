'use strict';
const { DataTypes } = require("sequelize"); // Import DataTypes from Sequelize

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Feedback', {
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
            comment: {
                type: DataTypes.TEXT,
                allowNull: false
            },
            rating: {
                type: DataTypes.TEXT,
                allowNull: false
            },
            is_deleted: {
                type: DataTypes.BOOLEAN,
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
        await queryInterface.dropTable('Feedback');
    }
};
