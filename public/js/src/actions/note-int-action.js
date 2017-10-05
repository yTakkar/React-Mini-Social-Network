import { post } from 'axios'

const note_details = note => {
  return dispatch => {
    post('/api/get-note-details', { note })
      .then(s => dispatch({ type: "NOTE_DETAILS", payload: s.data }) )
      .catch(e => console.log(err) )
  }
}

const likes = note => {
  return dispatch => {
    post('/api/likes', { note })
      .then(likes => dispatch({ type: "LIKES", payload: likes.data }) )
      .catch(err => console.log(err) )
  }
}

const liked = obj => {
  return {
    type: "LIKED",
    payload: obj
  }
}

const unliked = note => {
  return {
    type: "UNLIKED",
    payload: note
  }
}

module.exports = {
  note_details,
  likes,
  liked,
  unliked
}
