const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db.config");

const Feedbacks = sequelize.define("Feedbacks", {
    id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.BIGINT,
        

    },
    From : {
        type: DataTypes.TEXT,
        allowNull: false
    },
    To : {
        type: DataTypes.TEXT,
        allowNull: false
    },
    Rating : {
        type: DataTypes.TEXT,
        allowNull: false
    },
    Feedback: {
        type: DataTypes.TEXT,
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

module.exports = Feedbacks;
