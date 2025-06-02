import { Router } from "express";
import {
  findAppointments,
  findAppointmentById,
  createAppointment,
  updateAppointment,
  deleteAppointment,
} from "../services/appointments.services.js";

const router = Router();

router.get("/appointments", findAppointments);
router.get("/appointments/:id", findAppointmentById);
router.post("/appointments", createAppointment);
router.put("/appointments/:id", updateAppointment);
router.delete("/appointments/:id", deleteAppointment);

export default router;
