import $ from 'jquery'

const note_int_def = {
  note_details: {},
  likes: []
}

const note_int = (state=note_int_def, action) => {
	let { payload: py } = action

	switch (action.type) {
    case "NOTE_DETAILS":
      return { ...state, note_details: py }
      break

    case "LIKES":
      return { ...state, likes: py }
      break

    case "LIKED":
      return { ...state, likes: liked(state.likes, py) }
      break

    case "UNLIKED":
      return { ...state, likes: unliked(state.likes, py) }
      break
	}
	return state
}

const liked = (likes, like) => {
  likes.unshift(like)
  return likes
}

const unliked = (likes, note) => {
  let user = $('#data').data('session')
  return likes.filter(l => l.like_by != user && l.note_id == note )
}

export default note_int
