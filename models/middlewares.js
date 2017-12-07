const db = require('./db')
const P = require('bluebird')

const LoggedIn = (req, res, next) => {
  !req.session.id ? res.redirect('/login') : next()
}

const NotLoggedIn = (req, res, next) => {
  req.session.id ? res.redirect('/') : next()
}

const MainRedirect = (req, res, next) => {
  req.session.id ? next() : res.redirect('/welcome')
}

const variables = (req, res, next) => {
  let loggedIn = (req.session.id) ? true : false
  res.locals.loggedIn = loggedIn
  res.locals.session = req.session
  next()
}

const not_found = (req, res, next) => {
  let options = {
    title: "Oops!"
  }
  res.status(404).render('error', { options })
}

const MeOrNot = (req, res, next) => {
  db.query('SELECT COUNT(id) as e FROM users WHERE id=?', [req.params.id])
    .then(is => is[0].e == 0 ? res.redirect('/error') : next())
    .catch(err => console.log(err))
}

module.exports = {
  LoggedIn,
  NotLoggedIn,
  MainRedirect,
  variables,
  not_found,
  MeOrNot,
}
