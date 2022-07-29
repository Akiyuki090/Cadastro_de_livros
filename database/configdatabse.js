const mysql = require("Mysql");
const dotenv = require("dotenv");

dotenv.config();

const conn = mysql.createConnection({
  host: "localhost",
  user: `${process.env.user}`,
  password: `${process.env.password}`,
  database: "nodemysql1",
});

module.exports = conn;
