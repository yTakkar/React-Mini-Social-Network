const 
	app = require('express').Router(),
	mw = require('../models/middlewares'),
	chalk = require('../models/chalk'),
	login = require('../models/_login'),
	P = require('bluebird')

app.get('/login', mw.NotLoggedIn, (req, res) => {
	let options = { title: "Login to note" }
	res.render('login', { options })
})

app.get('/signup', mw.NotLoggedIn, (req, res) => {
	let options = { title: "Signup to note" }
	res.render('signup', { options })
})

app.get('/registered', mw.LoggedIn, (req, res) => {
	login.registered(req, res)
})

app.get('/deep/most/topmost/activate/:id', mw.LoggedIn, (req, res) => {
	login.activate(req, res)
})

app.post('/user/signup', (req, res) => {
	login.signup(req, res)
})

app.post('/user/login', (req, res) => {
	login.login(req, res)
})

app.get('/logout', mw.LoggedIn, (req, res) => {
    req.session.id = null
	let url = (req.session.id == null) ? "/login" : "/"
	res.redirect(url)
})

module.exports = app