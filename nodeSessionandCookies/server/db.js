const mysql = require("mysql");

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "Abhas123@",
  database: "nodeSessionAndCookies",
});

module.exports = db;
