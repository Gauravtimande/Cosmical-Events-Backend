import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { JWT_KEY } from "../const/credentials"
const nodemailer = require("nodemailer");
import Users from "../models/Users";
import response from "../const/response"
import { HTTP_MESSAGES } from "../const/message"
import VendorServices from "../models/VendorServices";
import Feedback from "../models/Feedbacks";
import EventCoordinators from "../models/EventCoordinators";



export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the email exists in the Users table
    const user = await Users.findOne({ where: { email } });

    // If user not found, return an error response
    if (!user) {
      return response.errorResponse(res, 404, {}, 'User not found');
    }

    // Compare the password with the hashed password
    if (await bcrypt.compare(password, user.password)) {
      // Determine the role
      const role = user.role.toUpperCase(); // Ensure role is uppercase for consistency

      // Generate JWT Token
      const token = jwt.sign(
        {
          _id: user.id,
          email: user.email,
          role: role,
        },
        JWT_KEY,
        { expiresIn: "24h" }
      );

      // Return success response with token and user details
      return response.successResponse(res, 200, {
        access_token: token,
        user: { id: user.id, email: user.email, role: role },
      }, 'Login successful');
    } else {
      // If the password is incorrect, return a 404 response
      return response.errorResponse(
        res,
        404,
        {},
        'Incorrect password'
      );
    }
  } catch (error) {
    // Handle any errors
    console.error(error);
    return response.errorResponse(res, 500, {}, 'Internal server error');
  }
};


async function sendOTPEmail(email, OTP) {
  // Create a transporter object using SMTP transport
  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
      user: 'sven.bogisich@ethereal.email',
      pass: 'TSJ82tsb6r4btYtrNx'
    }
  });

  // Send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Your App" <your-email@gmail.com>',
    to: email,
    subject: 'Verification OTP for Your App',
    text: `Your OTP is: ${OTP}`,
    html: `<p>Your OTP is: <strong>${OTP}</strong></p>`
  });

  console.log('Message sent: %s', info.messageId);
}


export const registerUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password, mobile_number } = req.body;

    // Check if the user already exists
    const existingUser = await Users.findOne({ where: { email, mobile_number } });
    if (existingUser) {
      console.log('User with this email or mobile number already exists');
      return res.status(409).json({ message: 'Email or mobile number already exists' });
    }

    // Generate OTP for email verification
    // const OTP = Math.floor(100000 + Math.random() * 900000); // Generate 6-digit OTP
   
    // await sendOTPEmail(email, OTP);

    const OTP =123456


    // Assuming role is 'USER' for registration
    const role = 'user';

    // Create New User in SQL
    const newUser = await Users.create({
      firstName,
      lastName,
      email,
      password: bcrypt.hashSync(password, 10),
      role,
      mobile_number,
      Otp: OTP // Store OTP in the database
    });

   

    res.status(200).json({
      user: {
        id: newUser.id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
        role: newUser.role
      },
      message: 'User registered successfully'
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

export const verifyOTPAndRegister = async (req, res) => {
  try {
    const { email, enteredOTP } = req.body;

    // Find user by email to retrieve stored OTP
    const user = await Users.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    console.log('User found:', user.email, user.Otp); // Log user's email and OTP

    // Compare enteredOTP with the stored OTP
    if (user.Otp !== parseInt(enteredOTP)) { // Ensure enteredOTP is parsed as integer for comparison
      return res.status(400).json({ message: 'Invalid OTP' });
    }

    // If OTP is valid, proceed with user registration
    user.Verified = true; // Mark user as verified
    await user.save(); // Save changes to the database

    // Generate JWT token for authenticated user
    const token = jwt.sign(
      {
        email,
        role: user.role,
      },
      JWT_KEY,
      {
        expiresIn: "24h",
      }
    );

    res.status(200).json({
      access_token: token,
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role
      },
      message: 'User registered successfully'
    });
  } catch (error) {
    console.error('OTP verification error:', error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};


export const registerVendor = async (req, res) => {
  try {
    const { firstName, lastName, email, password, mobile_number } = req.body;

    // Check if the user already exists
    const existingUser = await Users.findOne({ where: { email, mobile_number } });
    if (existingUser) {
      console.log('User with this email or mobile number already exists');
      return res.status(409).json({ message: 'Email or mobile number already exists' });
    }

    // Generate OTP for email verification
    // const OTP = Math.floor(100000 + Math.random() * 900000); // Generate 6-digit OTP
   
    // await sendOTPEmail(email, OTP);

    const OTP =123456


    // Assuming role is 'USER' for registration
    const role = 'vendor';

    // Create New User in SQL
    const newUser = await Users.create({
      firstName,
      lastName,
      email,
      password: bcrypt.hashSync(password, 10),
      role,
      mobile_number,
      Otp: OTP // Store OTP in the database
    });

    // Send success response with token
   

    res.status(200).json({
     
      user: {
        id: newUser.id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
        role: newUser.role
      },
      message: 'User registered successfully'
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};


export const registerCO_ORDINATOR = async (req, res) => {
  try {
    const { firstName, lastName, email, password, mobile_number } = req.body;

    // Check if the user already exists
    const existingUser = await Users.findOne({ where: { email, mobile_number } });
    if (existingUser) {
      console.log('User with this email or mobile number already exists');
      return res.status(409).json({ message: 'Email or mobile number already exists' });
    }

    // Generate OTP for email verification
    // const OTP = Math.floor(100000 + Math.random() * 900000); // Generate 6-digit OTP
   
    // await sendOTPEmail(email, OTP);

    const OTP =123456


    // Assuming role is 'VENDOR' for registration
    const role = 'co-ordinator';

    // Create New User in SQL
    const newUser = await Users.create({
      firstName,
      lastName,
      email,
      password: bcrypt.hashSync(password, 10),
      role,
      mobile_number,
      Otp: OTP // Store OTP in the database
    });

    // Send success response with token
  

    res.status(200).json({
       user: {
        id: newUser.id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
        role: newUser.role
      },
      message: 'User registered successfully'
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};




export const deleteUser = async (req, res) => {
  try {
    const { id } = req.body;
    console.log(id);

    const deleteUser = await Users.destroy({ where: { id } });

    res.status(200).json({
      user: {
        deleteUser
      },
      message: 'User deleted successfully'
    });
  } catch (error) {
    console.error('delete error:', error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};






export const ShowAlluser = async (req, res) => {
  try {
    const AllUsers = await Users.findAll( );

    return response.successResponse(
      res,
      200,
      { AllUsers },
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


export const getCounts = async (req, res) => {
  try {
    const userCount = await Users.count({ where: { role: 'user' } });
    const vendorCount = await Users.count({ where: { role: 'vendor' } });
    const coordinatorCount = await Users.count({ where: { role: 'co-ordinator' } });

    res.status(200).json({
      userCount,
      vendorCount,
      coordinatorCount,
    });
  } catch (error) {
    console.error('Error fetching counts:', error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};