import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { JWT_KEY } from "../const/credentials"
import Users from "../models/Users";
import response from "../const/response"
import { HTTP_MESSAGES } from "../const/message"
import VendorServices from "../models/VendorServices";
import Feedback from "../models/Feedbacks";
import Vendors from "../models/Vendors";

export const login = async (req, res) => {
  const { email, password } = req.body;

  // Check if the email exists in the Users table
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
    // If the email doesn't exist in the Users table, check in the Vendors table
    const vendor = await Vendors.findOne({
      where: {
        email,
        is_active: true,
        is_deleted: false,
      },
      attributes: {
        exclude: ["is_deleted", "token", "createdAt", "updatedAt", "is_active"],
      },
    });

    if (!vendor) {
      // If neither user nor vendor exists with the given email, return an error response
      return response.successResponse(res, 404, {}, HTTP_MESSAGES.EN.AUTH_ERROR);
    }

    // If the email exists in the Vendors table, compare the password with the hashed password
    if (await bcrypt.compare(password, vendor.password)) {
      // Generate JWT Token for vendor
      const token = jwt.sign(
        {
          _id: vendor.id,
          email: vendor.email,
          role: "vendor", // Assuming you want to set the role as "vendor"
        },
        JWT_KEY,
        {
          expiresIn: "24h",
        }
      );
      // unset password
      vendor.password = undefined;
      return response.successResponse(
        res,
        200,
        { access_token: token, user: vendor }, // Return vendor details
        HTTP_MESSAGES.EN.LOGIN_SUCCESS
      );
    }
    // If the password is incorrect for vendor, return a 404 response
    return response.successResponse(
      res,
      404,
      {},
      HTTP_MESSAGES.EN.USER_NOT_FOUND
    );
  }

  // If the email exists in the Users table, compare the password with the hashed password
  if (await bcrypt.compare(password, user.password)) {
    // Generate JWT Token for user
    const token = jwt.sign(
      {
        _id: user.id,
        email: user.email,
        role: "user", // Assuming you want to set the role as "user"
      },
      JWT_KEY,
      {
        expiresIn: "24h",
      }
    );
    // unset password
    user.password = undefined;
    return response.successResponse(
      res,
      200,
      { access_token: token, user }, // Return user details
      HTTP_MESSAGES.EN.LOGIN_SUCCESS
    );
  }
  // If the password is incorrect for user, return a 404 response
  return response.successResponse(
    res,
    404,
    {},
    HTTP_MESSAGES.EN.USER_NOT_FOUND
  );
};
export const registerUser = async (req, res) => {
  try {
    const { fullname, email, password, role, mobile_number } = req.body;

    // Check if the user already exists
    const existingUser = await Users.findOne({ where: { email,mobile_number } });
    if (existingUser) {
      console.log('User with this email already exists');
      return res.status(409).json({ message: 'Email already exists' });
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        email,
        role: role,
      },
      JWT_KEY,
      {
        expiresIn: "24h",
      }
    );

    // Create New User in SQL
    const newUser = await Users.create({
      fullname: fullname,
      email: email,
      password: bcrypt.hashSync(password, 10),
      role: role,
      mobile_number: mobile_number,
      token: token, // Save the generated token to the database
      active_step: 1
    });

    // Send success response with token
    res.status(200).json({
      access_token: token,
      user: {
        id: newUser.id,
        fullname: newUser.fullname,
        email: newUser.email,
        role: newUser.role
      },
      message: 'User registered successfully'
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
}



export const registerVendor = async (req, res) => {
  try {
    const { fullname, email, password, role, mobile_number } = req.body;

    // Check if the user already exists
    const existingUser = await Vendors.findOne({ where: { email } });
    if (existingUser) {
      console.log('Vendor with this email already exists');
      return res.status(409).json({ message: 'Email already exists' });
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        email,
        role: role,
      },
      JWT_KEY,
      {
        expiresIn: "24h",
      }
    );

    // Create New User in SQL
    const newUser = await Vendors.create({
      fullname: fullname,
      email: email,
      password: bcrypt.hashSync(password, 10),
      role: role,
      mobile_number: mobile_number,
      token: token, // Save the generated token to the database
      active_step: 1
    });

    // Send success response with token
    res.status(200).json({
      access_token: token,
      user: {
        id: newUser.id,
        fullname: newUser.fullname,
        email: newUser.email,
        role: newUser.role
      },
      message: 'User registered successfully'
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
}



export const ShowAllVendor = async (req, res) => {
  try {
    const AllVendors = await Vendors.findAll({
      where: {
        role: 'VENDOR'
      },
      include: [
        {
          model: VendorServices,
          attributes: ['serviceType', 'email', 'contactNo', 'is_active'],
          as: 'vendorServices',
          include: [
            {
              model: Feedback,
              attributes: ['comment', 'rating'],
              as: 'feedback'
            }
          ]
        }
      ]
    });

    return response.successResponse(
      res,
      200,
      { AllVendors },
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