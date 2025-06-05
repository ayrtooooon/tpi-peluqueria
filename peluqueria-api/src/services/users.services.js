import { User } from "../models/users.js";
import { Op } from "sequelize";

export const findUsers = async (req, res) => {
  const users = await User.findAll();
  res.json(users);
};

export const findUserById = async (req, res) => {
  const { id } = req.params;
  const user = await User.findByPk(id);

  if (!user) {
    return res.status(404).send({ message: "User not found" });
  }

  res.json(user);
};

export const CreateUser = async (req, res) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password) {
    return res.status(400).send({ message: "All fields are required" });
  }

  const user = await User.create({ name, email, password, role });
  res.json(user);
};

export const UpdateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email, password, role } = req.body;

  const user = await User.findByPk(id);

  if (!user) {
    return res.status(404).send({ message: "User not found" });
  }

  await user.update({ name, email, password, role });
  res.json(user);
};

export const DeleteUser = async (req, res) => {
  const { id } = req.params;
  const user = await User.findByPk(id);

  if (!user) {
    return res.status(404).send({ message: "User not found" });
  }

  await user.destroy();
  res.send({ message: "User deleted" });
};

export const assignBarberRole = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).send({ message: "Usuario no encontrado" });
    }

    if (user.role === "Admin") {
      return res
        .status(403)
        .json({ message: "No se puede modificar a otros admins." });
    }

    if (user.role === "Barber") {
      return res.status(403).json({ message: "El usuario ya es un barbero" });
    }

    user.role = "Barber";
    await user.save();

    res.json({ message: "Rol actualizado a barber", user });
  } catch (err) {
    res.status(500).send({ message: "Error al actualizar el rol" });
  }
};

export const revertToCustomerRole = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).send({ message: "Usuario no encontrado" });
    }

    if (user.role === "Admin") {
      return res
        .status(403)
        .json({ message: "No se puede modificar a otros admins." });
    }

    if (user.role === "Customer") {
      return res.status(403).json({ message: "El usuario ya es un cliente" });
    }

    user.role = "Customer";
    await user.save();

    res.json({ message: "Rol actualizado a customer", user });
  } catch (err) {
    res.status(500).send({ message: "Error al actualizar el rol" });
  }
};
