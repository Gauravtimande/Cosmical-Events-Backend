const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db.config");


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
      model: "User", 
      key: "id"
    }
  },
  serviceType: {
    type: DataTypes.ENUM(
      'VENUES', 'WEDDING CATERERS', 'photographers', 'DECORATORS', 
      'MAKEUP ARTISTS', 'Mehandi Artist', 'DJ AND MULTIMEDIA', 
      'Choreographers', 'Wedding entertainment', 'BRIDAL WEAR', 
      'GROOM WEAR', 'Jewellery', 'Wedding Pandit', 
      'Wedding Transportation', 'party places', 'Tent House', 
      'Hospitality', 'band', 'wedding cakes'
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
  location: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  city: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  contactNo: {
    type: DataTypes.TEXT,
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

module.exports = VendorServices;
