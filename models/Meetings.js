const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db.config");


const Meetings = sequelize.define("Meetings", {
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
    Notes: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    Date: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    Time: {
        type: DataTypes.STRING,
        allowNull: true
    },
    Duration_of_meeting: {
        type: DataTypes.STRING,
        allowNull: true
    },
    Status: {
        type: DataTypes.ENUM,
        values: ['cancel', 'successful', 'pending'],
        defaultValue: 'pending',
        allowNull: false
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





module.exports = Meetings;
