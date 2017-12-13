const
  app = require('express').Router(),
  P = require('bluebird'),
  root = process.cwd(),
  db = require('../models/db'),
  mail = require('../models/mail'),
  upload = require('multer')({
    dest: `${root}/public/temp/`
  }),
  fs = require('fs'),
  { promisify } = require('util'),
  { ProcessImage, DeleteAllOfFolder } = require('handy-image-processor')

// FOR GETTING THE COUNT OF GIVEN FIELD
app.post('/what-exists', (req, res) => {
  let { what, value } = req.body
  db.query(`SELECT COUNT(${what}) AS count FROM users WHERE ${what}=?`, [ value ])
    .then(s => res.json(s[0].count))
    .catch(e => res.json(e))
})

// FOR EDTING PROFILE
app.post('/edit-profile', (req, res) => {
  P.coroutine(function* () {
    let
      { username, email, bio } = req.body,
      { id: session } = req.session

    req.checkBody('username', 'Username is empty').notEmpty()
    req.checkBody('username', 'Username must contain only leters').isAlpha()
    req.checkBody('username', 'Username must be greater than 4').isLength({ min: 4 })
    req.checkBody('username', 'Username must be less than 32').isLength({ max: 32 })

    req.checkBody('email', 'Email is empty').notEmpty()
    req.checkBody('email', 'Email is invalid').isEmail()

    let errors = yield req.getValidationResult()

    if (!errors.isEmpty()) {
        let array = []
        errors.array().forEach(item => array.push(item.msg))
        res.json({ mssg: array })
    } else {

      req.session.username = username

      yield db.query('UPDATE users SET username=?, email=?, bio=? WHERE id=?', [username, email, bio, session]),
      yield db.query('UPDATE notes SET username=? WHERE user=?', [username, session])
      yield db.query('UPDATE profile_views SET view_by_username = ? WHERE view_by=?', [username, session]),
      yield db.query('UPDATE follow_system SET follow_by_username = ? WHERE follow_by=?', [username, session]),
      yield db.query('UPDATE follow_system SET follow_to_username = ? WHERE follow_to=?', [username, session])
      yield db.query('UPDATE likes SET like_by_username = ? WHERE like_by = ?', [username, session])

      res.json({
        mssg: 'Profile edited!!',
        success: true
      })

    }

  })()
})

// FOR CHANGING AVATAR
app.post('/change-avatar', upload.single('avatar'), (req, res) => {
  P.coroutine(function* () {
    let obj = {
      srcFile: req.file.path,
      width: 200,
      height: 200,
      destFile: `${root}/public/users/${req.session.id}/user.jpg`
    }

    yield ProcessImage(obj)
    yield DeleteAllOfFolder(`${root}/public/temp/`)

    res.json({ mssg: "Avatar changed!" })
  })()
})

// FOR RESENDING THE VERIFICATION LINK
app.post('/resend_vl', (req, res) => {
  P.coroutine(function* () {
    let
      { id } = req.session,
      e_q = yield db.query("SELECT email FROM users WHERE id=?", [ id ]),
      [{ email }] = e_q,
      url = `http://localhost:${process.env.PORT}/deep/most/topmost/activate/${id}`,
      options = {
        to: email,
        subject: "Activate your Notes App account",
        html: `<span>Hello, You received this message because you created an account on Notes App.<span><br><span>Click on button below to activate your account and explore.</span><br><br><a href='${url}' style='border: 1px solid #1b9be9; font-weight: 600; color: #fff; border-radius: 3px; cursor: pointer; outline: none; background: #1b9be9; padding: 4px 15px; display: inline-block; text-decoration: none;'>Activate</a>`
      }
      yield mail(options)
      res.json({ mssg: "Verification link sent to your email!~" })
  })()
})

app.post('/deactivate', (req, res) => {
  P.coroutine(function* () {
    let
      { id, username } = req.session,
      rmdir = promisify(fs.rmdir)

    yield db.query('DELETE FROM profile_views WHERE view_by=?', [id])
    yield db.query('DELETE FROM profile_views WHERE view_to=?', [id])
    yield db.query('DELETE FROM follow_system WHERE follow_by=?', [id])
    yield db.query('DELETE FROM follow_system WHERE follow_to=?', [id])
    yield db.query('DELETE FROM likes WHERE like_by=?', [id])
    let notes = yield db.query('SELECT note_id FROM notes WHERE user=?', [id])
    notes.map(n => db.query('DELETE FROM likes WHERE note_id=?', [n.note_id]))
    yield db.query('DELETE FROM notes WHERE user=?', [id])
    yield db.query('DELETE FROM users WHERE id=?', [id])

    yield DeleteAllOfFolder(`${root}/public/users/${id}/`)
    yield rmdir(`${root}/public/users/${id}/`)

    req.session.id = null

    res.json({ success: true })

  })().catch(e => console.log(e.stack))

})

module.exports = app
