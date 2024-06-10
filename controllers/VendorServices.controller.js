import response from "../const/response"
import { HTTP_MESSAGES } from "../const/message"
import VendorServices from "../models/VendorServices"
const { sequelize } = require('../config/db.config');

export const createVendorServices = async (req, res) => {
    try {
        const { vendor_id, serviceType, description, priceRange, serviceSpecificInfo, location, city, contactNo, email } = req.body;
        console.log('body:', req.body);
        let images = [];
        let video = null;

        console.log('Files:', req.files); 
        if (req.files) {
            if (req.files.image) {
                images = req.files.image.map(file => file.path); 
            }
            if (req.files.video && req.files.video.length > 0) {
                video = req.files.video[0].path; 
            }
        }

        const vendorService = await VendorServices.create({
            vendor_id,
            serviceType,
            description,
            priceRange,
            serviceSpecificInfo,
            image: images,
            video: video,
            location,
            city,
            contactNo,
            email
        });

        return response.successResponse(
            res,
            200,
            { vendorService },
            HTTP_MESSAGES.EN.VENDORSERVICE_ADD_SUCCESS
        );
    } catch (error) {
        console.error(error);
        return response.errorResponse(
            res,
            500,
            {},
            HTTP_MESSAGES.EN.VENDORSERVICE_NOT_ADD_SUCCESS
        );
    }
};


export const ShowAllVendorServices = async (req, res) => {
    try {
        const AllvendorService = await VendorServices.findAll();
        return response.successResponse(
            res,
            200,
            { AllvendorService },
        );
    } catch (error) {
        console.error(error);
        return response.errorResponse(
            res,
            500,
            {},
        );
    }
};




export const InActiveVendorServices = async (req, res) => {
    const ID = req.body
    try {
        const InActiveVendorService = await VendorServices.update({ is_deleted: true }, { where: ID });
        return response.successResponse(
            res,
            200,
            { InActiveVendorService },
        );
    } catch (error) {
        console.error(error);
        return response.errorResponse(
            res,
            500,
            {},
        );
    }
};




export const ActiveVendorServices = async (req, res) => {
    const ID = req.body
    try {
        const ActiveVendorService = await VendorServices.update({ is_deleted: false }, { where: ID });
        return response.successResponse(
            res,
            200,
            { ActiveVendorService },
        );
    } catch (error) {
        console.error(error);
        return response.errorResponse(
            res,
            500,
            {},
        );
    }
};



export const DeleteVendorServices = async (req, res) => {
    const ID = req.body
    try {
        const AllvendorService = await VendorServices.destroy({ where: ID });
        return response.successResponse(
            res,
            200,
            { AllvendorService },
        );
    } catch (error) {
        console.error(error);
        return response.errorResponse(
            res,
            500,
            {},
        );
    }
};



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


export const AddVendorServices = async (req, res) => {
    const { enumValue } = req.body;
    const Value = enumValue.toUpperCase();

    try {
        // Get current ENUM values
        const currentEnumValues = await getEnumValues();
        console.log('currentEnumValues', currentEnumValues)

        // Add the new value if it doesn't already exist
        if (!currentEnumValues.includes(Value)) {
            currentEnumValues.push(Value);
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
}



export const DeleteVendorService = async (req, res) => {
    const { enumValue } = req.body;
    const Value = enumValue.toUpperCase();

    try {
        // Get current ENUM values
        const currentEnumValues = await getEnumValues();
        console.log('currentEnumValues', currentEnumValues)

        // Add the new value if it doesn't already exist
        if (currentEnumValues.includes(Value)) {
            currentEnumValues.pop(Value);
        } else {
            return res.status(400).json({ error: 'Enum value not exists' });
        }

        // Construct the query to alter the enum type
        const query = `
        ALTER TABLE VendorServices MODIFY COLUMN serviceType ENUM(${currentEnumValues.map(value => `'${value}'`).join(', ')});
      `;

        // Execute the raw query
        await sequelize.query(query);

        return res.status(200).json({ message: 'Enum value remove successfully' });
    } catch (error) {
        console.error('Error adding enum value:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}