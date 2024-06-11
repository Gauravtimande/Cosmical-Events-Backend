import jwt from "jsonwebtoken";
import EventCoordinators from "../models/EventCoordinators";
import { JWT_KEY } from "../const/credentials";
import bcrypt from "bcrypt";
import response from "../const/response";

export const registerEventCoordinator = async (req, res) => {
    try {
      const { fullname, email, password, role, mobile_number } = req.body;
  
      console.log('req.body',req.body)
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

  export const ShowAllCoordinators = async (req, res) => {
    try {
        const AllEventCoordinator = await EventCoordinators.findAll();
        return response.successResponse(
            res,
            200,
            { AllEventCoordinator },
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

export const InActiveCoordinator = async (req, res) => {
  const ID = req.body
  try {
      const InActiveCoordinator = await EventCoordinators.update({ is_active: false }, { where: ID });
      return response.successResponse(
          res,
          200,
          { InActiveCoordinator },
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


export const ActiveEventCoordinator = async (req, res) => {
  const ID = req.body
  try {
      const ActiveEventCoordinator = await EventCoordinators.update({ is_active: true }, { where: ID });
      return response.successResponse(
          res,
          200,
          { ActiveEventCoordinator },
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


export const SoftDeleteCoordinator = async (req, res) => {
  const ID = req.body;
  try {
      const AllSoftDelete = await EventCoordinators.update({ is_deleted: true }, { where: ID });
      return response.successResponse(
          res,
          200,
          { AllSoftDelete },
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


export const PermanentDeleteCoordinator = async (req, res) => {
  const ID = req.body
  try {
      const ParticularCoordinator = await EventCoordinators.destroy({ where: ID });
      return response.successResponse(
          res,
          200,
          {  ParticularCoordinator  },
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
  

export const updatedEventCoordinator = async(req,res)=> {
  const {id, fullname ,email}=req.body;
  try{
    const updatedCoordinator = await EventCoordinators.update(
      {fullname,email},
      {where:{id}}
    );

    if(updatedCoordinator[0]=== 0)
      {
        return response.errorResponse(
          res,
          500,
          {},
        );
      }
      return response.successResponse(
        res,
        200,
        {updatedCoordinator},
      );  
  }
  catch (error) {
    console.error(error);
    return response.errorResponse(
        res,
        500,
        {},
    );
  }
};