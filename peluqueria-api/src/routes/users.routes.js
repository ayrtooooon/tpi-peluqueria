import { Router } from "express";
import {
  findUsers,
  findUserById,
  CreateUser,
  UpdateUser,
  DeleteUser,
  assignBarberRole,
} from "../services/users.services.js";

const router = Router();

router.get("/users", findUsers);
router.get("/users/:id", findUserById);
router.post("/users", CreateUser);
router.put("/users/:id", UpdateUser);
router.delete("/users/:id", DeleteUser);
router.put("/users/:id/barber", assignBarberRole);

export default router;
