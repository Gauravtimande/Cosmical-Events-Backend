import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { JWT_KEY } from "../const/credentials"
import Users from "../models/Users";
import response from "../const/response"
import { HTTP_MESSAGES } from "../const/message"



export const login = async (req, res) => {
  const { email, password } = req.body
  // Find the user with the provided email
  const user = await Users.findOne({
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

export const registerUser = async (req, res) => {
  try {
    const { fullname,email, password,role ,mobile_number} = req.body
    console.log("req.body",req.body)
    const existingUser = await Users.findOne({ where: { email } });
    if (existingUser) {
      console.log('user is not exist')
      return response.errorMessageResponse(
        res,
        409,
        HTTP_MESSAGES.EN.EMAIL_ALREADY_EXISTS
      );
    }

    // Create New User in SQL
    const newUser = await Users.create(
      {
        fullname:fullname,
        email:email,
        password: bcrypt.hashSync(password, 10),
        role: role,
        mobile_number: mobile_number,
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
        role: role,
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









