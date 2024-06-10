import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { JWT_KEY } from "../const/credentials"
import Users from "../models/Users";
import response from "../const/response"
import { HTTP_MESSAGES } from "../const/message"
import VendorServices from "../models/VendorServices";
import Feedback from "../models/Feedbacks";
import Vendors from "../models/Vendors";
import EventCoordinators from "../models/EventCoordinators";
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the email exists in any of the tables
    let user = await Users.findOne({ where: { email } });
    let role = 'USER'; // Default role

    // If user not found in Users table, check in the Vendors table
    if (!user) {
      user = await Vendors.findOne({ where: { email } });
      role = 'VENDOR';
    }

    // If user not found in Vendors table, check in the Admins table
    // if (!user) {
    //   user = await Admins.findOne({ where: { email } });
    //   role = 'ADMIN';
    // }

    // If user not found in Admins table, check in the EventCoordinators table
    if (!user) {
      console.log('EVENT-COORDINATOR')
      user = await EventCoordinators.findOne({ where: { email } });
      role = 'EVENT-COORDINATOR';
    }

    // If user not found with the given email, return an error response
    if (!user) {
      return response.errorResponse(res, 404, {}, HTTP_MESSAGES.EN.AUTH_ERROR);
    }

    // Compare the password with the hashed password
    if (await bcrypt.compare(password, user.password)) {
      // Generate JWT Token
      const token = jwt.sign(
        {
          _id: user.id,
          email: user.email,
          role: role, // Use the role determined above
        },
        JWT_KEY,
        { expiresIn: "24h" }
      );

      // Return success response with token and user details
      return response.successResponse(res, 200, {
        access_token: token,
        user: { id: user.id, email: user.email, role: role },
      }, HTTP_MESSAGES.EN.LOGIN_SUCCESS);
    } else {
      // If the password is incorrect, return a 404 response
      return response.errorResponse(
        res,
        404,
        {},
        HTTP_MESSAGES.EN.USER_NOT_FOUND
      );
    }
  } catch (error) {
    // Handle any errors
    console.error(error);
    return response.errorResponse(res, 500, {}, HTTP_MESSAGES.EN.INTERNAL_SERVER_ERROR);
  }
};



export const registerUser = async (req, res) => {
  try {
    const { fullname, email, password, role, mobile_number } = req.body;

    // Check if the user already exists
    const existingUser = await Users.findOne({ where: { email, mobile_number: `+91${mobile_number}` } });
    if (existingUser) {
      console.log('User with this email or mobile number already exists');
      return res.status(409).json({ message: 'Email or mobile number already exists' });
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
      mobile_number: `+91${mobile_number}`, // Store mobile number in +91 format
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
};

export const registerVendor = async (req, res) => {
  try {
    const { fullname, email, password, role, mobile_number } = req.body;

    console.log('body',req.body)
    const existingVendor = await Vendors.findOne({ where: { email, mobile_number: `+91${mobile_number}` } });
    if (existingVendor) {
      console.log('Vendor with this email or mobile number already exists');
      return res.status(409).json({ message: 'Email or mobile number already exists' });
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

    // Create New Vendor in SQL
    const newVendor = await Vendors.create({
      fullname: fullname,
      email: email,
      password: bcrypt.hashSync(password, 10),
      role: role,
      mobile_number: `+91${mobile_number}`, // Store mobile number in +91 format
      token: token, // Save the generated token to the database
      active_step: 1
    });

    // Send success response with token
    res.status(200).json({
      access_token: token,
      user: {
        id: newVendor.id,
        fullname: newVendor.fullname,
        email: newVendor.email,
        role: newVendor.role
      },
      message: 'Vendor registered successfully'
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};


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