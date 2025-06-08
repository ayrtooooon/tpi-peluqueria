import { Appointment } from "../models/appointments.js";

export const validateString = (str, minLength, maxLength) => {
  if (minLength && str.length < minLength) return false;
  else if (maxLength && str.length > maxLength) return false;

  return true;
};

export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (
  password,
  minLength,
  maxLength,
  needsUppercase,
  needsNumber
) => {
  if (minLength && password.length < minLength) return false;
  else if (maxLength && password.length > maxLength) return false;
  else if (needsUppercase && !/[A-Z]/.test(password)) return false;
  else if (needsNumber && !/\d/.test(password)) return false;

  return true;
};

export const hasConflictingAppointment = async (barber_id, date, time) => {
  if (!barber_id || !date || !time) return false;

  const conflictingAppointment = await Appointment.findOne({
    where: {
      barber_id,
      appointment_date: date,
      appointment_time: time,
    },
  });

  return !!conflictingAppointment; // Devuelve true si existe
};
