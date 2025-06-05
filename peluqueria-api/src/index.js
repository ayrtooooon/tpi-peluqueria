import express from "express";

import { PORT } from "./config.js";
import { sequelize } from "./db.js";

import "./models/users.js";
import "./models/appointments.js";

import peluqueriaRoutes from "./routes/users.routes.js";
import appointmentRoutes from "./routes/appointments.routes.js";

const app = express();

try {
  app.use(express.json());
  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    next();
  });
  app.listen(PORT);
  app.use(peluqueriaRoutes);
  app.use(appointmentRoutes);

  await sequelize.sync({ alter: true });

  console.log(`Server listening on port ${PORT}`);
} catch (error) {
  console.log(`There was an error on initialization`);
}
