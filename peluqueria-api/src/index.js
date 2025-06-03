import express from "express";
import cors from "cors";

import { PORT } from "./config.js";
import { sequelize } from "./db.js";

import "./models/users.js";
import "./models/appointments.js";

import peluqueriaRoutes from "./routes/users.routes.js";
import appointmentRoutes from "./routes/appointments.routes.js";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());

app.use(peluqueriaRoutes);
app.use(appointmentRoutes);

const startServer = async () => {
  try {
    await sequelize.sync();
    app.listen(PORT, () => {
      console.log(`🟢 Servidor escuchando en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Error durante la inicialización:", error);
  }
};

startServer();
