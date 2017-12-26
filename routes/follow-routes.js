const
  app = require('express').Router(),
  P = require('bluebird'),
  db = require('../models/db')

// TO CHECK IF SESSION FOLLOWING USER
app.post('/is-following', (req, res) => {
  P.coroutine(function* () {
    let
      { body: { username }, session: { id: session } } = req,
      id = yield db.getId(username),
      is = yield db.is_following(session, id)
    res.json(is)
  })().catch(e => res.json(e.stack))
})

app.post('/follow', (req, res) => {
  P.coroutine(function* () {
    let
      { user, username } = req.body,
      { username: susername, id: session } = req.session,
      insert = {
        follow_by: session,
        follow_by_username: susername,
        follow_to: user,
        follow_to_username: username,
        follow_time: new Date().getTime()
      },
      f = yield db.query('INSERT INTO follow_system SET ?', insert)
    res.json({ ...insert, follow_id: f.insertId })
  })()
})

// TO UNFOLLOW
app.post('/unfollow', (req, res) => {
  db.query('DELETE FROM follow_system WHERE follow_by=? AND follow_to=?', [req.session.id, req.body.user])
    .then(unfollow => res.json(unfollow))
    .catch(err => res.json(err))
})

// TO GET FOLLOWERS
app.post('/get-followers', (req, res) => {
  P.coroutine(function* () {
    let
      id = yield db.getId(req.body.username),
      followers = yield db.query('SELECT * FROM follow_system WHERE follow_to = ? ORDER BY follow_time DESC', [ id ])
    res.json(followers)
  })()
})

// TO GET FOLLOWINGS
app.post('/get-followings', (req, res) => {
  P.coroutine(function* () {
    let
      id = yield db.getId(req.body.username),
      followings = yield db.query('SELECT follow_id, follow_to, follow_to_username, follow_time FROM follow_system WHERE follow_by = ? ORDER BY follow_time DESC', [ id ])
    res.json(followings)
  })()
})

// FOR PROFILE VIEW
app.post('/view-profile', (req, res) => {
  P.coroutine(function* () {
    let
      { username } = req.body,
      { id: session } = req.session,
      id = yield db.getId(username),
      [{ time: dtime }] = yield db.query('SELECT MAX(view_time) as time FROM profile_views WHERE view_by=? AND view_to=?', [session, id]),
      time = parseInt(new Date().getTime() - parseInt(dtime))

    if (time >= 120000 || !dtime) {
      let insert = {
        view_by: session,
        view_by_username: username,
        view_to: id,
        view_time: new Date().getTime()
      }
      yield db.query('INSERT INTO profile_views SET ?', insert)
    }

    res.json('Hello, World!!')

  })()
})


// FOR GETTING PROFILE VIEWS
app.post('/get-profile-views', (req, res) => {
  P.coroutine(function* () {
    let
      { username } = req.body,
      id = yield db.getId(username),
      [{ count }] = yield db.query('SELECT COUNT(view_id) AS count FROM profile_views WHERE view_to = ?', [id])
    res.json(count)
  })()
})

module.exports = app
