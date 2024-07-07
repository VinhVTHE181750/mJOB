const config = require("../../config.json");
const Sequelize = require("sequelize");
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
    }
);

// async () => {
//   try {
//     await sequelize.authenticate();
//     console.log("Connection has been established successfully.");
//   } catch (error) {
//     console.error("Unable to connect to the database:", error);
//   }
// };

// Create tables if not exist
sequelize.sync();

// Update columns
// sequelize.sync({alter: true});

// Drop tables and recreate them
// sequelize.sync( force = true);

module.exports = {
    sequelize,
    Sequelize,
};
