import express from "express";
import { storage } from "../config/multer.config";
const { sequelize } = require('../config/db.config');
import multer from "multer";
import VendorServices from "../models/VendorServices"
const VendorServiceControlers = require('../controllers/VendorServices.controller')


const upload = multer({
    storage: storage
});

export const VendorServiceRouter = express.Router();

VendorServiceRouter.post("/Add-VendorService-ino", upload.array('image'),VendorServiceControlers.createVendorServices );
VendorServiceRouter.get("/All-VendorService",  VendorServiceControlers.ShowAllVendorServices);


//in active vendor service 
VendorServiceRouter.post("/Off-Active-VendorService", VendorServiceControlers.InActiveVendorServices);

// active vendor service 

VendorServiceRouter.post("/On-Active-VendorService", VendorServiceControlers.ActiveVendorServices);

// permanently delete vendor service 
VendorServiceRouter.delete("/Delete-VendorService", VendorServiceControlers.DeleteVendorServices);

// Function to get current ENUM values
async function getEnumValues() {
    const [results, metadata] = await sequelize.query(`
      SHOW COLUMNS FROM VendorServices LIKE 'serviceType';
    `);
  
    if (results.length === 0) {
      throw new Error('Column not found');
    }
  
    const enumValues = results[0].Type.match(/enum\((.*)\)/)[1].split(',').map(value => value.trim().replace(/^'(.*)'$/, '$1'));
  
    return enumValues;
  }

VendorServiceRouter.post('/add-enum-value', async (req, res) => {
    const { enumValue } = req.body;

    try {
      // Get current ENUM values
      const currentEnumValues = await getEnumValues();
  
      // Add the new value if it doesn't already exist
      if (!currentEnumValues.includes(enumValue)) {
        currentEnumValues.push(enumValue);
      } else {
        return res.status(400).json({ error: 'Enum value already exists' });
      }
  
      // Construct the query to alter the enum type
      const query = `
        ALTER TABLE VendorServices MODIFY COLUMN serviceType ENUM(${currentEnumValues.map(value => `'${value}'`).join(', ')});
      `;
  
      // Execute the raw query
      await sequelize.query(query);
  
      return res.status(200).json({ message: 'Enum value added successfully' });
    } catch (error) {
      console.error('Error adding enum value:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  });