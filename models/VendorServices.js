const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db.config");




const VendorServices = sequelize.define("VendorServices", {
    id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true
    },
    Vendor_ID: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
            model: "Users",
            key: "id"
        }
    },
    Price: {
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


module.exports = VendorServices;

