const
    app = require('express').Router(),
    db = require('../models/db'),
    P = require('bluebird'),
    mail = require('../models/mail'),
    gm = require('../models/gm'),
    upload = require('multer')({ dest: `${process.cwd()}/public/temp/` }),
    file = require('../models/file-system')

// FUNCTION TO GET ID FROM USERNAME
const getId = username => {
    return new Promise((resolve, reject) => {
        db.query('SELECT id FROM users WHERE username=? LIMIT 1', [ username ])
            .then(s => resolve(s[0].id) )
            .catch(e => reject(e) )
    })
}

// FOR GETTING THE ID OF ANY USER
app.post('/get-id', (req, res) => {
    getId(req.body.username)
        .then(s => res.json(s) )
        .catch(e => res.json(e) )
})

// FOR CHECKING IF IT'S A VALID USER
app.post('/is-user-valid', (req, res) => {
    db.query('SELECT COUNT(id) AS userCount FROM users WHERE username=? LIMIT 1', [req.body.username])
        .then(is => res.json(is[0].userCount) )
        .catch(err => res.json(err) )
})

// FOR PROFILE VIEW
app.post('/view-profile', (req, res) => {
    P.coroutine(function *(){
        let
            { username } = req.body,
            { id: session } = req.session,
            id = yield getId(username),
            [{ time: dtime }] = yield db.query('SELECT MAX(view_time) as time FROM profile_views WHERE view_by=? AND view_to=?', [ session, id ]),
            time = parseInt(new Date().getTime()-parseInt(dtime))

        if(time >= 120000 || !dtime){
            insert = {
                view_by: session, 
                view_by_username: username,
                view_to: id,
                view_time: new Date().getTime()
            },
            view = yield db.query('INSERT INTO profile_views SET ?', insert)
        } 

    })()    
})

// FOR GETTING PROFILE VIEWS
app.post('/get-profile-views', (req, res) => {
    P.coroutine(function *(){
        let 
            { username } = req.body,
            id = yield getId(username),
            [{ count }] = yield db.query('SELECT COUNT(view_id) AS count FROM profile_views WHERE view_to = ? ORDER BY view_time DESC', [id])
        res.json(count)
    })()
})

// TO CHECK IF SESSION FOLLOWING USER
app.post('/is-following', (req, res) => {
    P.coroutine(function *(){
        let 
            { body: { username }, session: { id: session } } = req,
            id = yield getId(username),
            is = yield db.query('SELECT COUNT(follow_id) AS is_following FROM follow_system WHERE follow_by=? AND follow_to=? LIMIT 1', [session, id])
        res.json((is[0].is_following == 1) ? true : false)
    })()
        .catch(e => res.json(e.stack) )
})

app.post('/follow', (req, res) => {
    P.coroutine(function *(){
        let 
            { user, username } = req.body,
            { username: susername, id: session } = req.session,
            insert = {
                follow_by: session,
                follow_by_username: susername,
                follow_time: new Date().getTime()
            },
            insert_two = {
                follow_to: user,
                follow_to_username: username
            },
            f = yield db.query('INSERT INTO follow_system SET ?', Object.assign({}, insert, insert_two))
        res.json(Object.assign({}, insert, { follow_id: f.insertId }))
    })()
})

// TO UNFOLLOW
app.post('/unfollow', (req, res) => {
    db.query('DELETE FROM follow_system WHERE follow_by=? AND follow_to=?', [req.session.id, req.body.user])
        .then(unfollow => res.json(unfollow) )
        .catch(err => res.json(err) )
})

// TO GET FOLLOWERS
app.post('/get-followers', (req, res) => {
    P.coroutine(function *(){
        let 
            id = yield getId(req.body.username),
            followers = yield db.query('SELECT follow_id, follow_by, follow_by_username, follow_time FROM follow_system WHERE follow_to = ? ORDER BY follow_time DESC', [id])
        res.json(followers)
    })()
})

// TO GET FOLLOWINGS
app.post('/get-followings', (req, res) => {
    P.coroutine(function *(){
        let 
            id = yield getId(req.body.username),
            followings = yield db.query('SELECT follow_id, follow_to, follow_to_username, follow_time FROM follow_system WHERE follow_by = ? ORDER BY follow_time DESC', [id])
        res.json(followings)
    })()
})

// /FOR DETAILS OF GIVEN USER
app.post('/get-details', (req, res) => {
    db.query('SELECT * FROM users WHERE username=?', [req.body.get])
        .then(get => res.json(get[0]) )
        .catch(err => res.json(err) )
})

// FOR GETTING THE COUNT OF GIVEN FIELD
app.post('/what-exists', (req, res) => {
    let { what, value } = req.body
    db.query(`SELECT COUNT(${what}) AS count FROM users WHERE ${what}=?`, [ value ])
        .then(s => res.json(s[0].count) )
        .catch(e => res.json(e) )
})

// FOR EDTING PROFILE
app.post('/edit-profile', (req, res) => {
    P.coroutine(function *(){
        let { username, email, bio } = req.body,    
            { id: session } = req.session

        req.checkBody('username', 'Username is empty').notEmpty()
        req.checkBody('username', 'Username must contain only leters').isAlpha()
        req.checkBody('username', 'Username must be greater than 4').isLength({ min: 4 })
        req.checkBody('username', 'Username must be less than 32').isLength({ max: 32 })

        req.checkBody('email', 'Email is empty').notEmpty()
        req.checkBody('email', 'Email is invalid').isEmail()

        let errors = yield req.getValidationResult()

        if(!errors.isEmpty()){
            let 
                result = errors.array()
                array = []
            result.forEach(item => array.push(item.msg) )
            res.json({ mssg: array })
        } else {
            
            req.session.username = username
            let 
                edit = yield db.query('UPDATE users SET username=?, email=?, bio=? WHERE id=?', [username, email, bio, session]),
                notes = yield db.query('UPDATE notes SET username=? WHERE user=?', [username, session])
                view = yield db.query('UPDATE profile_views SET view_by_username = ? WHERE view_by=?', [username, session]),
                follower = yield db.query('UPDATE follow_system SET follow_by_username = ? WHERE follow_by=?', [username, session]),
                following = yield db.query('UPDATE follow_system SET follow_to_username = ? WHERE follow_to=?', [username, session])

            res.json({ mssg: 'Profile edited!', success: true })

        }

    })()
})

// FOR CHANGING AVATAR
app.post('/change-avatar', upload.single('avatar'), (req, res) => {
    P.coroutine(function*(){
        let 
            obj = {
                srcFile: req.file.path,
                width: 200,
                height: 200,
                destFile: `${process.cwd()}/public/users/${req.session.id}/user.jpg`
            },
            modify = yield gm(obj),
            dlt = yield file.dlt_all_of_folder(`${process.cwd()}/public/temp/`)
        res.json({ mssg: "Avatar changed!" })
    })()
})

// FOR RESENDING THE VERIFICATION LINK
app.post('/resend_vl', (req, res) => {
    P.coroutine(function *(){
        let 
            { id } = req.session
            e_q = yield db.query("SELECT email FROM users WHERE id=?", [id]),
            [{ email }] = e_q,
            url = `http://localhost:${process.env.PORT}/deep/most/topmost/activate/${id}`,
            options = {
                to: email,
                subject: "Activate your Notes App account",
                html: `<span>Hello, You received this message because you created an account on Notes App.<span><br><span>Click on button below to activate your account and explore.</span><br><br><a href='${url}' style='border: 1px solid #1b9be9; font-weight: 600; color: #fff; border-radius: 3px; cursor: pointer; outline: none; background: #1b9be9; padding: 4px 15px; display: inline-block; text-decoration: none;'>Activate</a>`
            }
        mail(options).then(re => res.json({ mssg: "Verification link sent to your email!" }) )
    })()
})

// FOR GETTING ALL THE USER NOTES
app.post('/get-notes', (req, res) => {
    P.coroutine(function *(){
        let 
            id = yield getId(req.body.get),
            notes = yield db.query("SELECT * FROM notes WHERE user = ? ORDER BY note_id DESC", [ id ])
        res.json(notes)        
    })()
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
        .then(s =>{
            let n = Object.assign({}, insert, { note_id: s.insertId, mssg: "Note created!" })
            s.affectedRows == 1 ? res.json(n) : null
        })
        .catch(e => res.json(e) )
})

app.post('/no-of-notes', (req, res) => {
    P.coroutine(function *(){
        let notes = yield db.query('SELECT COUNT(note_id) AS count FROM notes WHERE user=?', [req.body.user])
        res.json(notes[0].count)
    })()
})

// FOR GETTING ALL THE DETAILS OF A NOTE BY A NOTE_ID
app.post('/get-note-details', (req, res) => {
    db.query('SELECT * FROM notes WHERE note_id=? LIMIT 1', [ req.body.note ])
        .then(s => res.json(s[0]) )
        .catch(e => res.json(e) )
})

// FOR GETTING ALL THE DETAILS OF A NOTE BY A NOTE_ID
app.post('/delete-note', (req, res) => {
    db.query('DELETE FROM notes WHERE note_id=?', [ req.body.note ])
        .then(s => res.json({ mssg: "Note deleted!" }) )
        .catch(e => console.log(e) )
})

// FOR EDITING THE NOTE
app.post('/edit-note', (req, res) => {
    let { title, content, note_id } = req.body
    db.query('UPDATE notes SET title=?, content=? WHERE note_id=? AND user=?', [title, content, note_id, req.session.id])
        .then(update => (update.affectedRows == 1) ? res.json({ mssg: 'Note edited!' }) : null )
        .catch(err => res.json(err) )
})

// GET ALL FEEDS
app.post('/feeds', (req, res) => {
    db.query('SELECT notes.note_id, notes.user, notes.username, notes.title, notes.content, notes.note_time FROM notes, follow_system WHERE follow_system.follow_by = ? AND follow_system.follow_to = notes.user ORDER BY notes.note_time DESC', [req.session.id])
    .then(feed => res.json(feed) )
    .catch(err => res.json(err) )
})

// FOR EXPLORING NEW USERS
app.post('/explore', (req, res) => {
    P.coroutine(function *(){
        let 
            { id: session } = req.session,
            followings = yield db.query('SELECT id, username, email FROM users WHERE id <> ? ORDER BY RAND() LIMIT 10', [session])
        res.json(followings)
    })()
})

// CHECK IF SESSION LIKED THE NOTE OR NOT
app.post('/liked-or-not', (req, res) => {
    P.coroutine(function *(){
        let 
            { body, session } = req,
            [{ l }] = yield db.query('SELECT COUNT(like_id) AS l FROM likes WHERE like_by = ? AND note_id = ?', [session.id, body.note])
        res.json(l == 1 ? true : false)
    })()
})

// FOR LIKING THE NOTE
app.post('/like', (req, res) => {
    P.coroutine(function *(){
        let 
            { session, body } = req,
            insert = {
                like_by: session.id,
                like_by_username: session.username,
                note_id: parseInt(body.note),
                like_time: new Date().getTime()
            },
            like = yield db.query('INSERT INTO likes SET ?', insert)
        res.json(Object.assign({}, insert, { liked: like.insertId }))
    })()
})

app.post('/unlike', (req, res) => {
    P.coroutine(function *(){
        let 
            { session, body } = req,
            unlike = yield db.query('DELETE FROM likes WHERE note_id=? AND like_by=?', [body.note, session.id])
        res.json(unlike)
    })()
})

// GET LIKES OF THE NOTE
app.post('/likes', (req, res) => {
    db.query('SELECT * FROM likes WHERE note_id=? ORDER BY like_id DESC', [req.body.note])
        .then(likes => res.json(likes) )
        .catch(err => res.json(err) )
})

module.exports = app