const
	chalk = require('chalk'),
	an = require('chalk-animation')

const error = chalk.bgRed.bold
const success = chalk.blue.bold

const s = mssg => console.log(success(mssg))
const e = mssg => console.log(error(mssg))

const rainbow = mssg => setTimeout(() =>  an.rainbow(mssg).start(), 100 )
const radar = mssg => setTimeout(() => an.radar(mssg).start(), 100 )

module.exports = {
    error,
    success,
    s,
		e,
		rainbow,
		radar
}
