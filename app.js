import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import User from "./modal/UserModal.js";
import Assessment from "./modal/assessment.js";

import sequelize from "./utils/database.js";
import createInitialUser from "./services/createInitialUser.js";

import userRoutes from "./routes/userRoutes.js";
import assessmentRoutes from "./routes/assessmentRoutes.js";

const app = express();

dotenv.config();
app.use(cors());
app.use(express.json());

app.use('/users', userRoutes);
app.use('/assessments', assessmentRoutes);

const PORT = process.env.PORT

// Define relations here 👇
User.hasMany(Assessment, { foreignKey: "user_id", onDelete: "CASCADE" });
Assessment.belongsTo(User, { foreignKey: "user_id" });

sequelize
    .sync({ force: !true })
    .then(async () => {
        await createInitialUser();
        // Start the server
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error("Unable to connect to the database:", err);
    });