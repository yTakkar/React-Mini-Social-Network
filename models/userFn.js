const
  db = require('../models/db'),
  mail = require('../models/mail'),
  hl = require('handy-log'),
  P = require('bluebird'),
  fs = require('fs'),
  util = require('util'),
  path = require('path'),
  dir = process.cwd()

const signup = (req, res) => {
  let { body: { username, email, password, password_again }, session } = req

  req.checkBody('username', 'Username is empty').notEmpty()
  req.checkBody('username', 'Username must contain only leters').isAlpha()
  req.checkBody('username', 'Username must be greater than 4').isLength({ min: 4 })
  req.checkBody('username', 'Username must be less than 32').isLength({ max: 32 })

  req.checkBody('email', 'Email is empty').notEmpty()
  req.checkBody('email', 'Email is invalid').isEmail()

  req.checkBody('password', 'Password field is empty').notEmpty()
  req.checkBody('password_again', 'Password field is empty').notEmpty()
  req.checkBody('password', 'Passwords don\'t match').equals(password_again)

  P.coroutine(function *(){

    let errors = yield req.getValidationResult()

    if(!errors.isEmpty()){
      let
          result = errors.array(),
          array = []
      result.forEach(item => array.push(item.msg) )
      res.json({ mssg: array })
    } else {
      let
        user_q = yield db.query('SELECT COUNT(*) as usernameCount from users WHERE username = ?', [username]),
        [{ usernameCount }] = user_q

      if(usernameCount == 1){
        res.json({ mssg: "Username already exists!" })
      } else {
        let
          email_q = yield db.query('SELECT COUNT(*) as emailCount FROM users WHERE email = ?', [email]),
          [{ emailCount }] = email_q

        if(emailCount == 1){
          res.json({ mssg: "Email already exists!" })
        } else {
          let
            newUser = {
              username,
              email: req.body.email,
              password,
              email_verified: "no",
              joined: new Date().getTime()
            },
            create_user = yield db.createUser(newUser),
            { affectedRows, insertId } = create_user

          if(affectedRows == 1){

            let mkdir = util.promisify(fs.mkdir)
            yield mkdir(dir+`/public/users/${insertId}`)
            fs
              .createReadStream(dir+'/public/images/spacecraft.jpg')
              .pipe(fs.createWriteStream(dir+`/public/users/${insertId}/user.jpg`))

            let
              url = `http://localhost:${process.env.PORT}/deep/most/topmost/activate/${insertId}`,
              options = {
                to: email,
                subject: "Activate your Notes App account",
                html: `<span>Hello, You received this message because you created an account on Notes App.<span><br><span>Click on button below to activate your account and explore.</span><br><br><a href='${url}' style='border: 1px solid #1b9be9; font-weight: 600; color: #fff; border-radius: 3px; cursor: pointer; outline: none; background: #1b9be9; padding: 4px 15px; display: inline-block; text-decoration: none;'>Activate</a>`
              }
            mail(options)
              .then(m =>{
                hl.s(m)
                session.id = insertId
                session.username = username
                session.email_verified = "no"
                res.json({ mssg: `Hello, ${session.username}!!`, success: true })
              })
              .catch(me =>{
                hl.error(me)
                res.json({ mssg: "Error sending email!" })
              })

          }

        }

      }

    }

  })()

}

const login = (req, res) => {
  P.coroutine(function* (){
    let { body: { username: rusername, password: rpassword }, session } = req
    req.checkBody('username', 'Username is empty').notEmpty()
    req.checkBody('password', 'Password field is empty').notEmpty()

    let errors = yield req.getValidationResult()

    if(!errors.isEmpty()){
      let
        result = errors.array(),
        array = []
      result.forEach(item => array.push(item.msg) )
      res.json({ mssg: array })
    } else {
      let
          user = yield db.query('SELECT COUNT(id) as userCount, id, password, email_verified from users WHERE username = ? LIMIT 1', [rusername]),
          [{userCount, id, password, email_verified}] = user
      if(userCount == 0){
        res.json({ mssg: "User not found!" })
      } else if(userCount > 0) {
        let same = yield db.comparePassword(rpassword, password)
        if(!same){
          res.json({ mssg: "Wrong password!" })
        } else {
          session.id = id
          session.username = rusername
          session.email_verified = email_verified

          res.json({ mssg: `Hello, ${session.username}!!`, success: true })
        }
      }

    }

  })()
}

const registered = (req, res) => {
  P.coroutine(function *(){
    let
      title = "You are now registered!",
      mssg = "Email has been sent. Check your inbox and click on the provided link!!",
      { id } = req.session,
      reg = yield db.query("SELECT email_verified FROM users WHERE id=? LIMIT 1", [id]),
      [{ email_verified }] = reg,
      options = Object.assign({}, { title }, { mssg })

    email_verified == "yes" ?
      res.redirect(`/deep/most/topmost/activate/${id}`)
    :
      res.render("registered", { options })

  })()
}

const activate = (req, res) => {
  P.coroutine(function *(){
    let
      { params: { id }, session } = req,
      act = yield db.query('UPDATE users SET email_verified=? WHERE id=?', ["yes", id]),
      { changedRows } = act,
      mssg

    session.email_verified = "yes"
    mssg = (changedRows == 0) ? "alr" : "yes"
    res.redirect(`/email-verification/${mssg}`)

  })()
}

module.exports = {
  signup,
  login,
  registered,
  activate,
}
