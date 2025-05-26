import { Router } from "express";
import {
  findUsers,
  findUserById,
  CreateUser,
  UpdateUser,
  DeleteUser,
} from "../services/users.services";

const router = Router();

router.get("/users", findUsers);
router.get("/users/:id", findUserById);
router.post("/users", CreateUser);
router.put("/users/:id", UpdateUser);
router.delete("/users/:id", DeleteUser);

export default router;
