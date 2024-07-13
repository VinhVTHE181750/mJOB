const config = require("../../config.json");
const Sequelize = require("sequelize");
const { log } = require("../utils/Logger");
const sequelize = new Sequelize(
  config.database.database,
  config.database.user,
  config.database.password,
  {
    dialect: config.database.dialect,
    server: config.database.server,
    port: config.database.port,
    database: config.database.database,
    schema: config.database.schema,
    authentication: {
      type: "default",
      options: {
        userName: config.database.user,
        user: config.database.user,
        password: config.database.password,
      },
      pool: {
        max: config.database.pool.max,
        min: config.database.pool.min,
        idle: config.database.pool.idle,
        acquire: config.database.pool.acquire,
      },
    },
    logging: async (msg, object) => {
      let level;
      if (msg.includes("SequelizeDatabaseError")) level = "ERROR";
      else if (msg.startsWith("Executing")) level = "DEBUG";
      await log(msg, level, "sequelize");
    },
  }
);
log("Connecting to database...", "INFO", "sequelize");

sequelize.sync();
log("Syncing tables...", "INFO", "sequelize");

module.exports = {
  sequelize,
  Sequelize,
};
