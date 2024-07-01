const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db.config");


const Event = sequelize.define("Event", {
    id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true
    },
    Coordinator_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
            model: "Users",
            key: "id"
        }
    },
    User_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
            model: "Users",
            key: "id"
        }
    },
    EventName: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    Budget: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    Description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    Proposed_Date: {
        type: DataTypes.STRING,
        allowNull: true
    },
    Start_Date: {
        type: DataTypes.STRING,
        allowNull: true
    },
    End_Date: {
        type: DataTypes.STRING,
        allowNull: true
    },
    Event_preferences_locations: {
        type: DataTypes.JSON,
        allowNull: true
    },
    Status: {
        type: DataTypes.ENUM,
        values: ['cancel', 'successful', 'pending'],
        defaultValue: 'pending',
        allowNull: false
    },
    Notes: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    deletedAt: {
        type: DataTypes.DATE,
        allowNull: true
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false
    }



}, {
    timestamps: true
});





module.exports = Event;
