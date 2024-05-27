import jwt from "jsonwebtoken";
import EventCoordinators from "../models/EventCoordinator";
import { JWT_KEY } from "../const/credentials";
import bcrypt from "bcrypt";
import response from "../const/response";

export const registerEventCoordinator = async (req, res) => {
    try {
      const { fullname, email, password, role, mobile_number } = req.body;
  
      // Check if the user already exists
      const existingUser = await EventCoordinators.findOne({ where: { email } });
      if (existingUser) {
        console.log('EventCoordinator with this email already exists');
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
      const newUser = await EventCoordinators.create({
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
        message: 'EventCoordinator registered successfully'
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Something went wrong' });
    }
  }
  