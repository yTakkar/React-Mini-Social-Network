import $ from 'jquery'
import axios from 'axios'
import Notify from 'handy-notification'
import P from 'bluebird'

import * as notes_action from '../actions/notes-action'
import * as user_action from '../actions/user-action'
import * as follow_action from '../actions/follow-action'
import * as note_int_action from '../actions/note-int-action'

// FUNCTION FOR SHORTENING
const shortener = (elem, length) => {
  let parse = parseInt(length),
      len = elem.length
  if (!parse) { return; }
  return (len >= parse) ? `${elem.substr(0, length-2)}..` : (len < parse) ? elem : null
}

// FUNCTION FOR COMMON LOGIN
const commonLogin = options => {
    let { data, btn, url, redirect, defBtnValue } = options
    let overlay2 = $('.overlay-2')

    btn
      .attr('value', 'Please wait..')
      .addClass('a_disabled')
    overlay2.show()

    $.ajax({
        url,
        data,
        method: "POST",
        dataType: "JSON",
        success: (data) => {
            let { mssg, success } = data
            console.log(data);
            if(success){
              Notify({ value: mssg, done: () => location.href = redirect })
              btn.attr('value', 'Redirecting..')
              overlay2.show()
            } else {
              Notify({ value: mssg })
              btn
                .attr('value', defBtnValue)
                .removeClass('a_disabled')
              overlay2.hide()
            }
            btn.blur()
        }
    })
}

// FUNCTION TO CAPITALIZE FIRST LETTER OF A WORD
const c_first = str => {
  return str.charAt(0).toUpperCase()+str.substr(1)
}

// FUNCTION TO CHECK WHETHER ITS ME OR NOT
const Me = user => {
  return user == $('#data').data('session') ? true : false
}

// FUNCTION TO CHECK WHETHER EMAIL IS ACTIVATED ON NOT
const e_v = () => {
  let ea = $('.data').data('email-verified')
  return ea == "yes" ? true : false
}

// FUNCTION FOR PROFILE DATA UPDATING
const forProfile = (dispatch, username) => {
  P.coroutine(function *(){
    let 
      valid = yield axios.post('/api/is-user-valid', { username }),
      s_username = $('.data').data('username')

    valid.data == 0 ? location.href = "/error/notfound" : null

    if(username != s_username){ 
      axios.post('/api/view-profile', { username })
      dispatch(follow_action.is_following(username))
    }

    dispatch(user_action.user_details(username))
    dispatch(notes_action.getNotes(username))
    dispatch(follow_action.get_followers(username))
    dispatch(follow_action.get_followings(username))
    dispatch(follow_action.get_profile_views(username))
  })()
}

// FUNCTION FOR GOING BACK
const back = (e, history) => {
  e.preventDefault()
  history.goBack()
}

// FUNCTION FOR EDTITNG PROFILE
const edit_profile = options => {
  P.coroutine(function *(){

    let 
      { susername, semail } = options,
      username = $('.e_username').val(),
      email = $('.e_email').val(),
      bio = $('.e_bio').val(),
      button = $('.e_done'),
      uCount = yield axios.post('/api/what-exists', { what: "username", value: username }),
      eCount = yield axios.post('/api/what-exists', { what: "email", value: email })
    
    button.addClass('a_disabled').text('Processing..').blur()

    if(!username){
        Notify({ value: "Username must not be empty!" })
    } else if(!email){
        Notify({ value: "Email must not be empty!" })
    } else if(uCount.data == 1 && username != susername){
        Notify({ value: "Username already exists!" })
    } else if(eCount.data == 1 && email != semail){
        Notify({ value: "Email already exists!" })
    } else {

        let 
          edit = yield axios.post('/api/edit-profile', { username, email, bio }),
          { mssg, success } = edit.data
          
        Notify({ value: mssg, done: () => success ? location.reload() : null })

    }

    button.removeClass('a_disabled').text('Done Editing').blur()

  })().catch(e => console.log(e.stack) )

}

// FUNCTION FOR CHANGING AVATAR
const change_avatar = options => {
  let 
    { file } = options,
    { name, size, type } = file,
    allowed = ['image/png', 'image/jpeg', 'image/gif']
  
  if(!allowed.includes(type)){
    Notify({ value: "Only images allowed!" })
  } else {

    let form = new FormData()
    form.append('avatar', file)
    
    $.ajax({
      url: "/api/change-avatar",
      method: "POST",
      processData: false,
      contentType: false,
      data: form,
      dataType: "JSON",
      success: data => Notify({ value: data.mssg, done: () => location.reload() })
    
    })

  }

}

// FUNCTION FOR RE-SENDING EMAIL VERIFICATION LINK
const resend_vl = () => {
  let 
    vl = $('.resend_vl'),
    o = $('.overlay-2')

  vl
    .addClass('a_disabled')
    .text('Sending verification link..')

  o.show()

  axios.post('/api/resend_vl')
    .then(s => {
        console.log(s.data)
        Notify({ value: s.data.mssg })
        vl
          .removeClass('a_disabled')
          .text('Send verification link')
          .blur()
        o.hide()
    })

}

// FUNCTION FOR CREATING A NOTE
const createNote = options => {
  let { title, content, dispatch, history } = options

  if(!title || !content){
      Notify({ value: "Values are missing!" })
  } else {

    axios.post('/api/create-note', { title, content })
      .then(s => {
          let { content, title, user, username, note_id, note_time, mssg } = s.data
          dispatch(notes_action.updateNote({ content, title, user, username, note_id, note_time }))
          history.goBack()
          Notify({ value: mssg })
      })
      .catch(e => console.log(e) )

  }
}

// FUNCTION FOR DELETING NOTE
const deleteNote = options => {
  let { note, dispatch, history } = options
  axios.post('/api/delete-note', { note })
    .then(s => {
        dispatch(notes_action.deleteNote(note))
        history.goBack()
        Notify({ value: s.data.mssg })
    })
    .catch(e => console.log(e) )
}

// FUNCTION FOR EDITING THE NOTE
const editNote = options => {
  let { title, content, note_id, setState, dispatch } = options

  if(title == "" || content == "" ){
    Notify({ value: "Fields are empty!!" })
    setState({ editing: true })
  } else {

    axios.post('/api/edit-note', { title, content, note_id })
      .then(s => {
        Notify({ value: s.data.mssg })
        dispatch(notes_action.editNote({ note_id, title, content }))
      })   
      .catch(e => console.log(e))

  }  

}

// FUNCTION TO FOLLOW
const follow = options => {
  let 
    defaults = {
      user: null,
      username: null,
      dispatch,
      update_followers: false,
      update_followings: false,
      done: () => { return null }
    },
    obj = { ...defaults, ...options },
    { user, username, dispatch, update_followers, update_followings, done } = obj

  axios.post('/api/follow', { user, username })
    .then(s => {

      let fwing = {
        follow_id: s.data.follow_id,
        follow_time: s.data.follow_time,
        follow_to: user,
        follow_to_username: username
      }

      update_followers ? dispatch(follow_action.follower(s.data)) : null
      update_followings ? dispatch(follow_action.following(fwing)) : null

      Notify({ value: "Followed!" })
      done()
      
    })
    .catch(e => console.log(e) )

}

const unfollow = options => {
  let 
    defaults = {
      user: null,
      dispatch: null,
      update_followers: false,
      update_followings: false,
      done: () => { return null }
    },
    obj = { ...defaults, ...options },
    { user, dispatch, update_followers, update_followings, done } = obj

  axios.post('/api/unfollow', { user })
    .then(s => {
      update_followers ? dispatch(follow_action.unfollower($('.data').data('session'))) : null
      update_followings ? dispatch(follow_action.unfollowing(user)) : null

      Notify({ value: "Unfollowed!" })
      done()
    })
    .catch(e => console.log(e) )

}

// TO LIKE THE NOTE
const like = options => {
  let { note, dispatch, done } = options

  axios.post('/api/like', { note })
    .then(s => {
      Notify({ value: "Liked" })
      dispatch(note_int_action.liked(s.data))
      done()
    })

}

// TO UNLIKE THE NOTE
const unlike = options => {
  let { note, dispatch, done } = options

  axios.post('/api/unlike', { note })
    .then(u => {
      console.log(u.data)
      Notify({ value: "Unliked" })
      dispatch(note_int_action.unliked(note))
      done()
    })

}

module.exports = {
    shortener,
    commonLogin,
    c_first,
    Me,
    e_v,
    forProfile,
    back,
    edit_profile,
    change_avatar,
    resend_vl,
    createNote,
    deleteNote,
    editNote,
    follow,
    unfollow,
    like,
    unlike
}