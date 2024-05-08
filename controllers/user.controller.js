import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { JWT_KEY } from "../const/credentials"
import User from "../models/User";
import response from "../const/response"
import { HTTP_MESSAGES } from "../const/message"
import CompanyInfo from "../models/CompanyInfo";


export const login = async (req, res) => {
  const { email, password } = req.body
  // Find the user with the provided email
  const user = await User.findOne({
    where: {
      email,
      is_active: true,
      is_deleted: false,
    },
    attributes: {
      exclude: ["is_deleted", "token", "createdAt", "updatedAt", "is_active"],
    },
  });

  if (!user) {
    return response.successResponse(res, 404, {}, HTTP_MESSAGES.EN.AUTH_ERROR);
  }

  // If the user is found, compare the password provided with the hashed password in the database
  if (await bcrypt.compare(password, user.password)) {
    // Fetch Other Details By Role
    //   const profile = await _getUserProfile(user.id, user.role);

    // Generate JWT Token
    const token = jwt.sign(
      {
        _id: user.id,
        email: user.email,
        role: user.role,
      },
      JWT_KEY,
      {
        expiresIn: "24h",
      }
    );
    // If the password is correct, send a success response with the JWT token
    // unset password
    user.password = undefined;
    return response.successResponse(
      res,
      200,
      { access_token: token, user },
      HTTP_MESSAGES.EN.LOGIN_SUCCESS
    );
  }
  // If the password is incorrect, send a 404 response
  return response.successResponse(
    res,
    404,
    {},
    HTTP_MESSAGES.EN.USER_NOT_FOUND
  );
};

export const registerVendor = async (req, res) => {
  try {
    const { email, password, phone} = req.body
    console.log("req.body",req.body)
    const date_of_birth = new Date();
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return response.errorMessageResponse(
        res,
        409,
        HTTP_MESSAGES.EN.EMAIL_ALREADY_EXISTS
      );
    }
    // if (req?.file) {
    //   //multer code goes here
    // }

    // Create New User in SQL
    const newUser = await User.create(
      {
        email,
        password: bcrypt.hashSync(password, 10),
        role: "VENDOR",
        mobile_number: phone,
        active_step : 1
      },
      {
        returning: true,
      }
    );
    const user_id = newUser.get("id");
    const user = newUser.get();
    newUser.password = null;

    const token = jwt.sign(
      {
        _id: user_id,
        email,
        role: "VENDOR",
      },
      JWT_KEY,
      {
        expiresIn: "24h",
      }
    );

    return response.successResponse(
      res,
      200,
      { access_token: token, user },
      HTTP_MESSAGES.EN.PATIENT_SIGNUP_SUCCESS
    );
  } catch (error) {
    console.log(error);
    return response.somethingErrorMsgResponse(
      res,
      500,
      HTTP_MESSAGES.EN.SOMETHING_WENT_WRONG,
      error
    );
  }
}




export const forgetPassword = async (req, res) => {
  try {
    const { email } = req.body;
    // Find the user with the provided email
    const otp = Math.floor(Math.random() * 900000) + 100000;
    const user = await User.findOne({
      where: {
        email,
        is_active: true,
        is_deleted: false,
      },
      attributes: {
        exclude: ["is_deleted", "createdAt", "updatedAt", "is_active"],
      },
    });
    // If no user is found with the provided email, send a 404 response
    if (!user) {
      return response.successResponse(
        res,
        404,
        {},
        "Incorrect email,Please check."
      );
    }
    await User.update({ token: bcrypt.hashSync(otp.toString(), 6) }, { where: { email } })
    console.log("forgot password otp", otp)
    //   await sendEmail(email, "Forgot Password", sendOtp.replace("[OTP]", otp));
    return response.successResponse(res, 200, {}, "OTP sent successfully");
  } catch (error) {
    console.log(error);
    return response.somethingErrorMsgResponse(res, 500, HTTP_MESSAGES.EN.ERROR);
  }
};





