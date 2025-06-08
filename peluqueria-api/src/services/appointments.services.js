import { Appointment } from "../models/appointments.js";

export const findAppointments = async (req, res) => {
  const appointments = await Appointment.findAll();
  res.json(appointments);
};

export const findAppointmentById = async (req, res) => {
  const { id } = req.params;
  const appointment = await Appointment.findByPk(id);

  if (!appointment) {
  return res.status(404).send({ message: "Appointment not found" });
}

  res.json(appointment);
};

export const createAppointment = async (req, res) => {
  const {
    appointment_date,
    appointment_time,
    service,
    customer_id,
    barber_id,
  } = req.body;

  if (!appointment_date || !appointment_time || !service) {
    return res.status(400).send({ message: "All fields are required" });
  }

  const newAppointment = await Appointment.create({
    appointment_date,
    appointment_time,
    service,
    customer_id,
    barber_id,
  });

  res.json(newAppointment);
};

export const updateAppointment = async (req, res) => {
  const { id } = req.params;
  const { appointment_date, appointment_time, service, barber_id } = req.body;

  const appointment = await Appointment.findByPk(id);

  if (!appointment) {
    return res.status(404).send({ message: "User not found" });
  }

  await appointment.update({
    appointment_date,
    appointment_time,
    service,
    barber_id,
  });
  res.json(appointment);
};

export const deleteAppointment = async (req, res) => {
  const { id } = req.params;
  const appointment = await Appointment.findByPk(id);

  if (!appointment) {
    return res.status(404).send({ message: "User not found" });
  }

  await appointment.destroy();
  res.send(`Appointment ${id} deleted`);
};

export const assignAppoinment = async (req, res) => {
  const { id } = req.params;
  const { barber_id } = req.body;

  console.log("Barber ID recibido:", barber_id); // <-- Agregar esto

  const appointment = await Appointment.findByPk(id);

  if (!appointment) {
    return res.status(404).json({ message: "Turno no encontrado" });
  }

  if (appointment.barber_id !== null || appointment.status !== "Pendiente") {
    return res.status(400).json({ message: "El turno ya está asignado o no está disponible" });
  }

  appointment.barber_id = barber_id;
  appointment.status = "Asignado";
  await appointment.save();

  res.json({ message: "Turno asignado" });
};
