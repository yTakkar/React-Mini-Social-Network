const
  app = require('express').Router(),
  P = require('bluebird'),
  db = require('../models/db')

// CHECK IF SESSION LIKED THE NOTE OR NOT
app.post('/liked-or-not', (req, res) => {
  P.coroutine(function* () {
    let
      { body, session } = req,
      [{ l }] = yield db.query('SELECT COUNT(like_id) AS l FROM likes WHERE like_by = ? AND note_id = ?', [session.id, body.note])
    res.json(l == 0 ? false : true)
  })()
})

// FOR LIKING THE NOTE
app.post('/like', (req, res) => {
  P.coroutine(function* () {
    let
      { session, body } = req,
      insert = {
        like_by: session.id,
        like_by_username: session.username,
        note_id: parseInt(body.note),
        like_time: new Date().getTime()
      },
      like = yield db.query('INSERT INTO likes SET ?', insert)
    res.json(Object.assign({}, insert, { like_id: like.insertId }))
  })()
})

app.post('/unlike', (req, res) => {
  P.coroutine(function* () {
    let { session, body } = req
    yield db.query('DELETE FROM likes WHERE note_id=? AND like_by=?', [body.note, session.id])
    res.json(null)
  })()
})

// GET LIKES OF THE NOTE
app.post('/likes', (req, res) => {
  db.query('SELECT * FROM likes WHERE note_id=? ORDER BY like_id DESC', [req.body.note])
    .then(likes => res.json(likes))
    .catch(err => res.json(err))
})

module.exports = app
