import response from "../const/response"
import { HTTP_MESSAGES } from "../const/message"
import VendorServices from "../models/VendorServices"






export const createVendorServices = async (req, res) => {
    try {
        const { vendor_id, serviceType, description, priceRange, serviceSpecificInfo, location, city, contactNo, email } = req.body;
        console.log("req.body", req.body)

        let images = [];
        if (req.files && req.files.length > 0) {
            images = req.files;
        }
        console.log('images', images)
        console.log('vendorID', vendor_id)

        const vendorService = await VendorServices.create({
            vendor_id: vendor_id,
            serviceType,
            description,
            priceRange,
            serviceSpecificInfo,
            image: images,
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
        const AllvendorService = await VendorServices.destroy( { where: ID });
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