import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";
import { AppointmentServices } from "../enums/enums.js";

export const Appointment = sequelize.define(
  "Appointment",
  {
    appointment_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    appointment_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    appointment_time: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    service: {
      type: DataTypes.ENUM(...AppointmentServices),
      allowNull: false,
    },
    customer_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Users",
        key: "user_id",
      },
    },
    barber_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Users",
        key: "user_id",
      },
    },
  },
  {
    timestamps: false,
  }
);

Appointment.associate = (models) => {
  // Relación con el cliente
  Appointment.belongsTo(models.User, {
    foreignKey: "customer_id",
    as: "customer",
  });

  // Relación con el barbero
  Appointment.belongsTo(models.User, {
    foreignKey: "barber_id",
    as: "barber",
  });
};
