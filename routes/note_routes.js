const
  app = require('express').Router(),
  P = require('bluebird'),
  db = require('../models/db')

// FOR GETTING ALL THE USER NOTES
app.post('/get-notes', (req, res) => {
  P.coroutine(function* () {
    let
      id = yield db.getId(req.body.get),
      notes = yield db.query("SELECT * FROM notes WHERE user = ? ORDER BY note_id DESC", [id])
    res.json(notes)
  })()
})

// FOR GETTING ALL THE DETAILS OF A NOTE BY A NOTE_ID
app.post('/get-note-details', (req, res) => {
  db.query('SELECT * FROM notes WHERE note_id=? LIMIT 1', [req.body.note])
    .then(s => res.json(s[0]))
    .catch(e => res.json(e))
})

// FOR GETTING ALL THE DETAILS OF A NOTE BY A NOTE_ID
app.post('/delete-note', (req, res) => {
  P.coroutine(function* () {
    let { note } = req.body
    yield db.query('DELETE FROM likes WHERE note_id=?', [note]),
    yield db.query('DELETE FROM notes WHERE note_id=?', [note])
    res.json({ mssg: "Note Deleted!!" })
  })()
})

// FOR EDITING THE NOTE
app.post('/edit-note', (req, res) => {
  let { title, content, note_id } = req.body
  db.query('UPDATE notes SET title=?, content=? WHERE note_id=? AND user=?', [title, content, note_id, req.session.id])
    .then(update => res.json({ mssg: 'Note edited!' }) )
    .catch(err => res.json(err))
})

// FOR CREATING A NOTE
app.post('/create-note', (req, res) => {
  let
    { session, body } = req,
    insert = {
      user: session.id,
      username: session.username,
      title: body.title,
      content: body.content,
      note_time: new Date().getTime()
    }
  db.query('INSERT INTO notes SET ?', insert)
    .then(s => {
      let n = Object.assign({}, insert, { note_id: s.insertId })
      res.json(n)
    })
    .catch(e => res.json(e))
})

app.post('/no-of-notes', (req, res) => {
  P.coroutine(function* () {
    let [{ count }] = yield db.query('SELECT COUNT(note_id) AS count FROM notes WHERE user=?', [req.body.user])
    res.json(count)
  })()
})

// GET ALL FEEDS
app.post('/feeds', (req, res) => {
  db.query('SELECT notes.note_id, notes.user, notes.username, notes.title, notes.content, notes.note_time FROM notes, follow_system WHERE follow_system.follow_by = ? AND follow_system.follow_to = notes.user ORDER BY notes.note_time DESC', [req.session.id])
    .then(feed => res.json(feed))
    .catch(err => res.json(err))
})

module.exports = app
