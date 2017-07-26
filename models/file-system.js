const 
    fs = require('fs'),
    util = require('util')

const dlt_all_of_folder = folder => {
    return new Promise((resolve, reject) => {

        let 
            read = util.promisify(fs.readdir),
            unlink = util.promisify(fs.unlink)

        read(folder)
            .then(items => {
                items.map(item => {
                    
                    unlink(folder+item)
                        .then(us => resolve('Deleted!') )
                        .catch(ue => reject(ue) )

                })
            })
        
    })
}

module.exports = {
    dlt_all_of_folder
}