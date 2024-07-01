const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db.config");


const EventServicesBooking = sequelize.define("EventServicesBooking", {
    id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true
    },
    User_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
            model: "Users",
            key: "id"
        }
    },
    Coordinator_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
            model: "Users",
            key: "id"
        }
    },
    Event_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
            model: "Users",
            key: "id"
        }
    },
    Start_date: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    End_date: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    Start_date: {
        type: DataTypes.JSON,
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





module.exports = EventServicesBooking;
