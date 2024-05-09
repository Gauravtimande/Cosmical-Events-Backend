import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { JWT_KEY } from "../const/credentials"
import User from "../models/User";
import response from "../const/response"
import { HTTP_MESSAGES } from "../const/message"
import Appointment from "../models/Appointment";
import { where } from "sequelize";



export const BookAppointment = async (req, res) => {

    try {
        const { userID, vendorID, fullName, email, mobileNo, notes } = req.body
        const appointment = await Appointment.create({

            userID: userID,
            vendorID: vendorID,
            fullName: fullName,
            email: email,
            mobileNo: mobileNo,
            notes: notes,
        },);
        return response.successResponse(
            res,
            200,
            { appointment },
            HTTP_MESSAGES.EN.APPOINTMENT_SUCCESS_BOOK
        );
    } catch (error) {
        return response.successResponse(
            res,
            500,
            {},
            HTTP_MESSAGES.EN.SOMETHING_WENT_WRONG
        );

    }

}



export const ShowAllAppointment = async (req, res) => {

    try {

        const appointment = await Appointment.findAll();
        return response.successResponse(
            res,
            200,
            { Appointment },
            HTTP_MESSAGES.EN.DATA_FOUND
        );
    } catch (error) {
        return response.successResponse(
            res,
            500,
            {},
            HTTP_MESSAGES.EN.DATA_NOT_FOUND
        );

    }

}



export const DeleteAppointment = async (req, res) => {

    try {

        const { ID } = req.body
        const appointment = await Appointment.update({ where: ID },{is_deleted:true});
        return response.successResponse(
            res,
            200,
            { Appointment },
            HTTP_MESSAGES.EN.DATA_FOUND
        );
    } catch (error) {
        return response.successResponse(
            res,
            500,
            {},
            HTTP_MESSAGES.EN.DATA_NOT_FOUND
        );

    }

}







