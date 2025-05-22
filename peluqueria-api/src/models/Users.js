import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";
import { UserRoles } from "../enums/enums.js";

export const User = sequelize.define(
  "User",
  {
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM(Object.values(UserRoles)),
      allowNull: false,
      defaultValue: "UserRoles.CUSTOMER",
    },
  },
  {
    timestamps: false,
  }
);
