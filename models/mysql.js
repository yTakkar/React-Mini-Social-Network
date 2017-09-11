const mysql = require('mysql')
const chalk = require('./chalk')

const db = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  charset: "utf8mb4"
})

db.connect(err => {
  if(err){
    chalk.e(err)
  }
})

module.exports = db
