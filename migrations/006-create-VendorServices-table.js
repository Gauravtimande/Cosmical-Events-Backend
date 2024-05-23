"use strict";


module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("VendorServices", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      vendor_id: {
        type: Sequelize.UUID, 
        allowNull: false,
        references: {
          model: "Vendors", 
          key: "id"
        }
      },
      serviceType: {
        type: Sequelize.ENUM(
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
        type: Sequelize.TEXT,
        allowNull: true
      },
      priceRange: {
        type: Sequelize.STRING,
        allowNull: true
      },
      serviceSpecificInfo: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      image: {
        type: Sequelize.JSON, 
        defaultValue: [],
        allowNull: true,
      },
      location: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      city: {
        type: Sequelize.STRING,
        allowNull: true
      },
      contactNo: {
        type: Sequelize.STRING,
        allowNull: true
      },
      email: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      is_deleted: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      is_active: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("VendorServices");
  }
};
