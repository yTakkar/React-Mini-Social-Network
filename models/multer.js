const multer = require('multer')

let avatar_storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, process.cwd()+'/public/users/5')
  },
  filename: (req, file, callback) => {
    callback(null, `user.jpg`)
  }
})

module.exports = {
    avatar_storage
}
