require('dotenv').config()

// Installed packages
const  
    express = require('express'),
    port = process.env.PORT,
    hbs = require('express-handlebars'),
    path = require('path'),
    logger = require('morgan'),
    favicon = require('serve-favicon'),
    bodyParser = require('body-parser'),
    validator = require('express-validator'),
    session = require('client-sessions'),
    app = express()

// Requiring route files
const 
    uRoutes = require('./routes/user-routes'),
    apiRoutes = require('./routes/api-routes'),
    mRoutes = require('./routes/main-routes'),
    followRoutes = require('./routes/follow-routes'),
    noteRoutes = require('./routes/note_routes'),
    nIntRoutes = require('./routes/note-int-routes'),
    editRoutes = require('./routes/edit-routes'),
    mw = require('./models/middlewares')

// View engine
app.engine('hbs', hbs({ extname: "hbs" }))
app.set('view engine', 'hbs')

// Middlewares
app.use(favicon(path.join(__dirname+"/public/images/favicon/favicon.ico")))
// app.use(logger("dev"))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(validator())
app.use(session({
    cookieName: "session",
    secret: process.env.SESSION_SECRET_LETTER,
    duration: 30 * 60 * 1000,
    activeDuration: 5 * 60 * 1000
}))
app.use(express.static(path.join(__dirname+"/public/")))

// Middleware for some local variables to be used in the template
app.use(mw.variables)

// Route files (Order is important)
app.use('/', uRoutes)
app.use('/api', apiRoutes)
app.use('/api', followRoutes)
app.use('/api', noteRoutes)
app.use('/api', nIntRoutes)
app.use('/api', editRoutes)
app.use('/', mRoutes)

app.listen(port, () => console.log('App running..') )