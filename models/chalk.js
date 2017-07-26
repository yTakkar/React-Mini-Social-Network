const chalk = require('chalk')

const error = chalk.bgRed.bold
const success = chalk.blue.bold

const s = mssg => console.log(success(mssg))

const e = mssg => console.log(error(mssg))

module.exports = {
    error, 
    success,
    s,
    e
}