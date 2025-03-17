// models/Assessment.js
import { DataTypes } from "sequelize";
import sequelize from "../utils/database.js";

const Assessment = sequelize.define("Assessment", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  total_questions: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  attempted: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  unattempted: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  correct: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  published: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

export default Assessment;
