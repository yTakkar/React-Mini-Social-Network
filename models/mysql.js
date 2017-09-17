const
  mysql = require('mysql'),
  hl = require('handy-log')

const db = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  charset: "utf8mb4"
})

db.connect(err => {
  if(err){
    hl.e(err)
  }
})

module.exports = db
