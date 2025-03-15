import express from "express";
import dotenv from "dotenv";
import sequelize from "./utils/database.js";
import createInitialUser from "./services/createInitialUser.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT


sequelize
    .sync({ force: !true })
    .then(async () => {
        await createInitialUser();
        // Start the server
        app.listen(process.env.PORT, () => {
            console.log(`Server is running on port ${process.env.PORT}`);
        });
    })
    .catch((err) => {
        console.error("Unable to connect to the database:", err);
    });