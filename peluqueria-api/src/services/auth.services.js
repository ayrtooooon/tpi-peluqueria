import bcrypt from "bcrypt";
import { User } from "../models/users.js";
import {
  validateEmail,
  validatePassword,
  validateString,
} from "../helpers/validations.js";

export const registerUser = async (req, res) => {
  // Valida los datos recibidos con la función personalizada.
  const result = validateRegisterUser(req.body);

  if (result.error) return res.status(400).send({ message: result.message });

  // Extrae name, email y password del body de la request
  const { name, email, password } = req.body;

  // Busca si ya existe un usuario con ese email
  const user = await User.findOne({
    where: { email },
  });

  // Si existe, devuelve error 400
  if (user)
    return res
      .status(400)
      .send({ message: "Este email ya se encuentra registrado." });

  // Configura 10 rondas de salt (costo computacional)
  const saltRounds = 10;

  // Genera un salt único
  const salt = await bcrypt.genSalt(saltRounds);

  // Hashea la contraseña con el salt
  const hashedPassword = await bcrypt.hash(password, salt);

  // Crea el nuevo usuario en la base de datos
  const newUser = await User.create({
    name,
    email,
    password: hashedPassword, // Guarda el hash, no la contraseña en texto plano
  });

  // Devuelve solo el ID del nuevo usuario
  res
    .status(201)
    .json({ id: newUser.id, message: "Usuario registrado correctamente" });
};

export const loginUser = async (req, res) => {
  // Valida los datos de la request con la función personalizada.
  const result = validateLoginUser(req.body);

  if (result.error) return res.status(400).send({ message: result.message });

  // Extrae email y password del body de la request
  const { email, password } = req.body;

  // Busca el usuario por email
  const user = await User.findOne({
    where: { email },
  });

  // Si no existe, devuelve error 401 (No autorizado)
  if (!user) return res.status(401).send({ message: "Usuario no existente" });

  // Compara la contraseña ingresada con el hash almacenado
  const comparison = await bcrypt.compare(password, user.password);

  // Si no coinciden, devuelve error 401
  if (!comparison)
    return res.status(401).send({ message: "Email y/o contraseña incorrecta" });

  return res
    .status(200)
    .json({ id: user.id, name: user.name, email: user.email, role: user.role });
};

const validateLoginUser = (req) => {
  const result = {
    error: false,
    message: "",
  };
  const { email, password } = req;

  if (!email || !validateEmail(email))
    return {
      error: true,
      message: "Mail inválido",
    };
  else if (!password || !validatePassword(password, 7, null, true, true)) {
    return {
      error: true,
      message: "Contraseña inválida",
    };
  }

  return result;
};

const validateRegisterUser = (req) => {
  const result = {
    error: false,
    message: "",
  };

  const { name, email, password } = req;

  if (!name || !validateString(name, null, 13))
    return {
      error: true,
      message: "El nombre de usuario debe tener menos de 13 caracteres",
    };

  if (!email || !validateEmail(email))
    return {
      error: true,
      message: "Mail inválido",
    };
  else if (!password || !validatePassword(password, 7, null, true, true)) {
    return {
      error: true,
      message:
        "La contraseña debe tener al menos 7 caracteres, una mayúscula y un número",
    };
  }

  return result;
};
