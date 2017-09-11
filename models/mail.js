const nodemailer = require('nodemailer')

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL,
    pass: process.env.MAIL_PASSWORD
  }
})

let mail = options => {
  return new Promise((resolve, reject) => {
    let o = Object.assign({}, {
      from: `"Notes App" <${process.env.MAIL}>`
    }, options)
    transporter.sendMail(o, (err, res) => err ? reject(err) : resolve('Mail sent!!'))
  })
}

module.exports = mail
