const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db.config");

const User = sequelize.define("User", {
  id: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
  },
  email: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  password: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  status: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  role: {
    type: DataTypes.ENUM,
    values: ["ADMIN", "VENDOR", "USER","EVENT-COORDINATOR"]
  },
  is_deleted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  is_active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  active_step:{
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  mobile_number: {
    type: DataTypes.STRING,
    allowNull: false // or false if it's required
  },
  token: {
    type: DataTypes.TEXT
  }
}, {
  timestamps: true
});

module.exports = User;