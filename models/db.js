const 
    db = require('./mysql'),
    util = require('util'),
    bcrypt = require('bcrypt-nodejs')

const query = (q, data) => {
    return new Promise((resolve, reject) => {
        db.query(q, data, (err, res) => {
            err ? reject(err) : resolve(res)
        })
    })
}

const createUser = user => {
    return new Promise((resolve, reject) => {
        bcrypt.hash(user.password, null, null, (error, hash) => {
            user.password = hash
            db.query('INSERT INTO users SET ?', user, (err, res) => {
                err ? reject(err) : resolve(res)
            })
        })
    })
}

const comparePassword = (password, hash) => {
    return new Promise((resolve, reject) => {
        bcrypt.compare(password, hash, (err, res) => {
            err ? reject(err) : resolve(res)
        })
    })
}

// FUNCTION TO GET ID FROM USERNAME
const getId = username => {
    return new Promise((resolve, reject) => {
        query('SELECT id FROM users WHERE username=? LIMIT 1', [username])
            .then(s => resolve(s[0].id))
            .catch(e => reject(e))
    })
}

module.exports = {
    query,
    createUser,
    comparePassword,
    getId
}
