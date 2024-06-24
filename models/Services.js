const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db.config");


const Services = sequelize.define("Services", {
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
  ServiceCategory_ID: {
    type: DataTypes.BIGINT, 
    allowNull: false,
    references: {
      model: "Categories", 
      key: "id"
    }
  },
  ServiceName: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  ServiceDescription: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  StartpriceRange: {
    type: DataTypes.STRING,
    allowNull: true
  },
  EndpriceRange: {
    type: DataTypes.STRING,
    allowNull: true
  },
  image: {
    type: DataTypes.JSONB,
    allowNull: false
  },
  Video: {
    type: DataTypes.JSONB,
    allowNull: false
  },
  Rating: {
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





module.exports = Services;
