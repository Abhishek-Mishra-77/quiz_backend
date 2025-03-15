import express from "express";
import dotenv from "dotenv";
import sequelize from "./utils/database.js";
import createInitialUser from "./services/createInitialUser.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT

app.listen(PORT, async () => {
    try {
        await sequelize.authenticate();
        await createInitialUser();
        console.log(`Server running on http://localhost:${PORT}`);
    } catch (error) {
        console.error("Error starting server:", error);
    }
});