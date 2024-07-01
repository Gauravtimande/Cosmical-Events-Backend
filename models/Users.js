const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db.config");




const Users = sequelize.define("Users", {
  id: {
    type: DataTypes.BIGINT,
    autoIncrement: true,
    primaryKey: true
  },
  firstName: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  lastName: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  email: {
    type: DataTypes.TEXT,
    allowNull: false,
    
  },
  password: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  Otp: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  Verified: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  mobile_number: {
    type: DataTypes.STRING,
    allowNull: true
  },
  role: {
    type: DataTypes.ENUM,
    values: ['user', 'vendor', 'admin', 'co-ordinator'],
    allowNull: false
  },
  deletedAt: {
    type: DataTypes.DATE,
    allowNull: true
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
  }
}, {
  timestamps: true 
});


module.exports = Users;

