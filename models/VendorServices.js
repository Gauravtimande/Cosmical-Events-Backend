const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db.config");
const Users = require("./Users");
const Feedbacks = require("./Feedbacks");


const VendorServices = sequelize.define("VendorServices", {
  id: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
  },
  vendor_id: {
    type: DataTypes.UUID, 
    allowNull: false,
    references: {
      model: "Vendors", 
      key: "id"
    }
  },
  serviceType: {
    type: DataTypes.ENUM(
      'VENUES', 'WEDDING CATERERS', 'PHOTOGRAPHERS', 'DECORATORS', 
      'MAKEUP ARTISTS', 'MEHANDI ARTIST', 'DJ AND MULTIMEDIA', 
      'CHOREOGRAPHERS', 'WEDDING ENTERTAINMENT', 'BRIDAL WEAR', 
      'GROOM WEAR', 'JEWELLERY', 'WEDDING PANDIT', 
      'WEDDING TRANSPORTATION', 'PARTY PLACES', 'TENT HOUSE', 
      'HOSPITALITY', 'BAND', 'WEDDING CAKES'
    ),
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  priceRange: {
    type: DataTypes.STRING,
    allowNull: true
  },
  serviceSpecificInfo: {
    type: DataTypes.TEXT,
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
  location: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  city: {
    type: DataTypes.STRING,
    allowNull: true
  },
  contactNo: {
    type: DataTypes.STRING,
    allowNull: true
  },
  email: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  is_deleted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  is_active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, {
  timestamps: true
});

// Define association with Feedback
VendorServices.hasMany(Feedbacks, { foreignKey: 'vendorID', as: 'feedbacks' });

// Define association with Users

module.exports = VendorServices;
