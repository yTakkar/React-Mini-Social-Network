const
    app = require('express').Router(),
    db = require('../models/db'),
    P = require('bluebird')

// FOR GETTING THE ID OF ANY USER
app.post('/get-id', (req, res) => {
    db.getId(req.body.username)
        .then(s => res.json(s) )
        .catch(e => res.json(e) )
})

// FOR CHECKING IF IT'S A VALID USER
app.post('/is-user-valid', (req, res) => {
    db.query('SELECT COUNT(id) AS userCount FROM users WHERE username=? LIMIT 1', [req.body.username])
        .then(is => res.json(is[0].userCount) )
        .catch(err => res.json(err) )
})

// /FOR DETAILS OF GIVEN USER
app.post('/get-details', (req, res) => {
    db.query('SELECT * FROM users WHERE username=?', [req.body.get])
        .then(get => res.json(get[0]) )
        .catch(err => res.json(err) )
})

// FOR EXPLORING NEW USERS
app.post('/explore', (req, res) => {
	P.coroutine(function *(){
		let
				{ id: session } = req.session,
				followings = yield db.query('SELECT id, username, email FROM users WHERE id <> ? ORDER BY RAND() LIMIT 10', [session]),
				ps = [],
				d = []

		followings.forEach(e => {
			ps.push(
				db.is_following(session, e.id).then(s => !s ? d.push(e) : null )
			)
		})

		Promise.all(ps).then(() => res.json(d) )

	})()
})

module.exports = app
