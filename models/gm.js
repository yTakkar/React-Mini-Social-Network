const gm = require('gm')
const fs = require('fs')

const GM = obj => {
    let {srcFile, width, height, destFile} = obj
    return new Promise((resolve, reject) => {
        gm(srcFile)
        .resize(width, height)
        .quality(100)
        .gravity('center')
        .write(destFile, err => {
            err ? reject(err) : resolve('Done!')
        })
    })
}

module.exports = GM