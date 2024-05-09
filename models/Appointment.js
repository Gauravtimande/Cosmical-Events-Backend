const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db.config");

const Appointment = sequelize.define("Appointment", {
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
            model: "User",
            key: "id"
        }
    },
    vendorID: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: "User",
            key: "id"
        }
    },
    fullName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    mobileNo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    notes: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    status: {
        type: DataTypes.ENUM('Book', 'Cancel'),
        allowNull: false,
        defaultValue: 'Book'
    },
    is_deleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
}, {
    timestamps: true
});

module.exports = Appointment;
