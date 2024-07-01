'use strict';
const { DataTypes } = require("sequelize");

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Feedbacks', {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.BIGINT,
                
        
            },
            From : {
                type: Sequelize.TEXT,
                allowNull: false
            },
            To : {
                type: Sequelize.TEXT,
                allowNull: false
            },
            Rating : {
                type: Sequelize.TEXT,
                allowNull: false
            },
            Feedback: {
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
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('Feedbacks');
    }
};
