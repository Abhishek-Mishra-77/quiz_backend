import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import sequelize from "./utils/database.js";
import createInitialUser from "./services/createInitialUser.js";

import userRoutes from "./routes/userRoutes.js";

const app = express();

dotenv.config();
app.use(cors());
app.use(express.json());

app.use('/users', userRoutes);

const PORT = process.env.PORT


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