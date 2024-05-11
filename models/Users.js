const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db.config");

const Users = sequelize.define("Users", {
  id: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
  },
  fullname: {
    type: DataTypes.TEXT,
    allowNull: false
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
    values: ["ADMIN", "VENDOR", "USER"]
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
    allowNull: false 
  },
  token: {
    type: DataTypes.TEXT
  }
}, {
  timestamps: true
});

module.exports = Users;