import express from "express";

import { PORT } from "./config.js";
import { sequelize } from "./db.js";

import "./models/users.js";

import peluqueriaRoutes from "./routes/users.routes.js";

const app = express();

try {
  app.use(express.json());
  app.listen(PORT);
  app.use(peluqueriaRoutes);

  await sequelize.sync();

  console.log(`Server listening on port ${PORT}`);
} catch (error) {
  console.log(`There was an error on initialization`);
}
