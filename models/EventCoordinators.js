const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db.config");

const EventCoordinators = sequelize.define("EventCoordinators", {
  id: {
    type: DataTypes.BIGINT,
    autoIncrement: true,
    primaryKey: true
  },
  Coordinators_ID: {
    type: DataTypes.BIGINT,
    allowNull: false,
    references: {
      model: "Users",
      key: "id"
    }
  },
  Educational_details_if_related_to_work : {
    type: DataTypes.TEXT,
    allowNull: false
  },
  Rating: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  Experience : {
    type: DataTypes.TEXT,
    allowNull: false
  },
  Small_description: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
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

module.exports = EventCoordinators;