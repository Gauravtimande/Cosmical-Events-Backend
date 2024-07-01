const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db.config");




const vendorDetails = sequelize.define("vendorDetails", {
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
    OwnerName: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    OwnerEmail: {
        type: DataTypes.TEXT,
        allowNull: false,
        
    },
    OwnerMobile_number: {
        type: DataTypes.STRING,
        allowNull: true
    },
    OwnerGender: {
        type: DataTypes.STRING,
        allowNull: true
    },
    OwnerDOB: {
        type: DataTypes.DATE,
        allowNull: false
    },
    OwnerCity: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    BusinessName: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    BusinessCategorises: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
            model: "Categories",
            key: "id"
        }
    },
    BusinessVerifiedStatus: {
        type: DataTypes.ENUM,
        values: ['active', 'inactive', 'pending'],
        defaultValue: 'inactive',
        allowNull: false

    },
    ServiceableAreas : {
        type: DataTypes.TEXT,
        allowNull: false
    },
    VenderOverallRatings: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    VenderOffers: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    status: {
        type: DataTypes.BOOLEAN,
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


module.exports = vendorDetails;

