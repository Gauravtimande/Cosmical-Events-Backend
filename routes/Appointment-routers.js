import express from "express";
import {ShowAllAppointment,BookAppointment,DeleteAppointment} from "../controllers/Appointment.controller";
export const appointmentRouters = express.Router();


appointmentRouters.get("/show-ShowAllAppointment",ShowAllAppointment)

