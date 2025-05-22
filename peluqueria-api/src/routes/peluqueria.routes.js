import { Router } from "express";
import { User } from "../models/users.js";

const router = Router();

router.get("/users", async (req, res) => {
  const users = await User.findAll();
  res.json(users);
});

router.get("/users/:id", (req, res) => {
  const { id } = req.params;
  res.send(`Obteniendo usuario con id: ${id}`);
});

router.post("/users", (req, res) => res.send("Creando usuario"));

router.put("/users/:id", (req, res) => {
  const { id } = req.params;
  res.send(`Actualizando usuario con id: ${id}`);
});

router.delete("/users/:id", (req, res) => {
  const { id } = req.params;
  res.send(`Eliminando usuario con id: ${id}`);
});

export default router;
