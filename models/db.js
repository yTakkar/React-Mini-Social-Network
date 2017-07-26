const db = require('./mysql')
const util = require('util')
const bcrypt = require('bcrypt-nodejs')

const query = (q, data) => {
    return new Promise((resolve, reject) => {
        db.query(q, data, (err, res) => {
            err ? reject(err) : resolve(res)
        })
    })
}

const createUser = (user) => {
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

module.exports = {
    query,
    createUser,
    comparePassword
}
