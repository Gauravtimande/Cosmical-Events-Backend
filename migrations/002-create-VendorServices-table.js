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
          model: "User", 
          key: "id"
        }
      },
      serviceType: {
        type: Sequelize.ENUM(
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
        type: Sequelize.TEXT,
        allowNull: true
      },
      contactNo: {
        type: Sequelize.TEXT,
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
