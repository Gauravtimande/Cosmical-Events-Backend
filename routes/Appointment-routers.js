import express from "express";
import {ShowAllAppointment,BookAppointment,DeleteAppointment} from "../controllers/Appointment.controller";
import {mustBeVendor} from "../middlewares/authorization";
import { verifyJWT } from "../middlewares/jwt";
export const appointmentRouters = express.Router();


appointmentRouters.get("/show-ShowAllAppointment",ShowAllAppointment)

