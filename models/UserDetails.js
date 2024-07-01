const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db.config");




const UserDetails = sequelize.define("UserDetails", {
  id: {
    type: DataTypes.BIGINT,
    autoIncrement: true,
    primaryKey: true
  },
  userID: {
    type: DataTypes.BIGINT,
    allowNull: false,
    references: {
      model: "Users",
      key: "id"
    }
  },
  City: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  PinCode: {
    type: DataTypes.TEXT,
    allowNull: false,
   
  },
  DOB: {
    type: DataTypes.DATE,
    allowNull: false
  },
  Gender: {
    type: DataTypes.STRING,
    allowNull: true
  },
  Mobile: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  Email: {
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


module.exports = UserDetails;

