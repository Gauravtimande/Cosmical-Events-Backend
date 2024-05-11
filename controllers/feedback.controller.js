
import response from "../const/response"
import { HTTP_MESSAGES } from "../const/message"
import Appointment from "../models/Appointment";
import { where } from "sequelize";
import Feedback from "../models/Feedback";

export const CreateFeedback = async (req, res) => {

    try {
        const {userID, vendorID, comment, rating } = req.body
        const feedback = await Appointment.create({

            userID: userID,
            vendorID: vendorID,
            comment: comment,
            rating: rating,
            
        },);
        return response.successResponse(
            res,
            200,
            { feedback },
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



export const ShowAllFeedback = async (req, res) => {

    try {

        const feedback = await Feedback.findAll();
        return response.successResponse(
            res,
            200,
            { feedback },
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



export const DeleteFeedback = async (req, res) => {

    try {

        const { feedbackID } = req.body
        const feedback = await Feedback.update({ where: feedbackID },{is_deleted:true});
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







