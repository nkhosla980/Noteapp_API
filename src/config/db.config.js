const knex = require("knex");
require("dotenv").config();

const db = knex({
  client: "mysql2",
  connection: {
    host: process.env.SQL_HOST,
    user: process.env.SQL_UNAME,
    password: process.env.SQL_PWD,
    database: process.env.SQL_DB,
    // charset: "utf8",
  },
  pool: { min: 0, max: 10 },
  acquireConnectionTimeout: 10000,
});

// Test the database connection and print database name and number of tables
db.raw("SELECT DATABASE() AS dbName")
  .then((result) => {
    const dbName = result[0][0].dbName;
    console.log(`Connected to database: ${dbName}`);

    return db.raw("SHOW TABLES");
  })
  .then((result) => {
    const tables = result[0];
    console.log(`Number of tables in the database: ${tables.length}`);
  })
  .catch((err) => {
    console.error("Database connection error:", err);
  });

module.exports = db;
