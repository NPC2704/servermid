const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  "sql_phuoccong_in",
  "sql_phuoccong_in",
  "tHXhbjKPX2SdMbmX",
  {
    host: "vp.midvietnam.com",
    port: "3308",
    dialect: "mysql",
    logging: false,
  }
);
const connectionDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};
connectionDatabase();
