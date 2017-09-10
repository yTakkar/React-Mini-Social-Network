const
  app = require('express').Router(),
  mw = require('../models/middlewares')

app.get('/welcome', mw.NotLoggedIn, (req, res) => {
	let options = { title: "Welcome to Notes App!" }
	res.render('welcome', { options })
})

app.get('/404', (req, res) => {
	let options = { title: "Oops!! Error • Notes App" }
	req.session.id ? res.redirect('/error') : res.render('404', { options })
})

app.get('/*', mw.LoggedIn,  (req, res) => {
	res.render('app')
})

module.exports = app
