import axios from 'axios'

const note_details = note => {
  return dispatch => {
    axios.post('/api/get-note-details', { note })
      .then(s => dispatch({ type: "NOTE_DETAILS", payload: s.data }) )
      .catch(e => dispatch({ type: "NOTE_DETAILS_ERR", payload: e }) )
  }
}

const likes = note => {
  return dispatch => {
    axios.post('/api/likes', { note })
      .then(likes => dispatch({ type: "LIKES", payload: likes.data }) )
      .catch(err => dispatch({ type: "LIKES_ERR", payload: err }) )
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
