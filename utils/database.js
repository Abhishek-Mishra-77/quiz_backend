import Sequelize from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize(process.env.DATABASENAME, process.env.DATA_USER, process.env.DATA_PASS, {
    dialect: 'mysql',
    host: 'localhost',
    logging: false,
    timezone: "Asia/Kolkata"
});


export default sequelize;