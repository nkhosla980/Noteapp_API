require("dotenv").config();

const db = knex({
  client: "mysql2",
  connection: {
    host: process.env.SQL_HOST,
    user: process.env.SQL_UNAME,
    password: process.env.SQL_PWD,
    database: process.env.SQL_DB,
  },
});

module.exports = db;
