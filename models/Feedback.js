const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db.config");

const Feedback = sequelize.define("Feedback", {
    id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,

    },
    userID: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: "Users",
            key: "id"
        }
    },
    vendorID: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: "Users",
            key: "id"
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
}, {
    timestamps: true
});

module.exports = Feedback;
