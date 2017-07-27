import $ from 'jquery'

const note_int_def = {
    note_details: {},
    liked: false,
    likes: []
}

const note_int = (state=note_int_def, action) => {
    switch (action.type) {
        case "NOTE_DETAILS": 
            return { ...state, note_details: action.payload }
            break;

        case "LIKED_OR_NOT":
            return { ...state, liked: action.payload }
            break;

        case "LIKES":
            return { ...state, likes: action.payload }
            break;

        case "LIKED":
            return { ...state, likes: liked(state.likes, action.payload) }
            break;

        case "UNLIKED":
            return { ...state, likes: unliked(state.likes, action.payload) }
            break;
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