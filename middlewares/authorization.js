import { HTTP_MESSAGES } from "../const/message";
import response from "../const/response";
import Users from "../models/Users";
import Vendors from "../models/Vendors";

export const mustBeVendor = async (req, res, next) => {
  try {
    const user_id = req.user._id;
    const vendor = await Vendors.findOne({
      attributes: ["role"],
      where: { id: user_id }
    });

    if (vendor && vendor.role === "VENDOR") {
      return next();
    } else {
      return response.unAuthorizedErrorMsgResponse(
        res,
        403,
        HTTP_MESSAGES.EN.NOT_AUTHORIZED
      );
    }
  } catch (error) {
    return response.errorMsgResponse(res, 500, error.message);
  }
};



export const mustBeUser = async (req, res, next) => {
  try {
    const user_id = req.user._id;
    const user = await Users.findOne({
      attributes: ["role"],
      where: { id: user_id }
    });

    if (user && user.role === "USER") {
      return next();
    } else {
      return response.unAuthorizedErrorMsgResponse(
        res,
        403,
        HTTP_MESSAGES.EN.NOT_AUTHORIZED
      );
    }
  } catch (error) {
    return response.errorMsgResponse(res, 500, error.message);
  }
};