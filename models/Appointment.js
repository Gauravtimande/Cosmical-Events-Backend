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
            model: "Users",
            key: "id"
        }
    },
    EventCoordinatorID: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: "EventCoordinator",
            key: "id"
        }
    },
    notes: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    status: {
        type: DataTypes.ENUM('BOOK', 'PENDING','CANCEL'),
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
