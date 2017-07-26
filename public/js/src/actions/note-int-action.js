import axios from 'axios'

const LikedOrNot = note => {
    return dispatch => {
        axios.post('/api/liked-or-not', { note })
            .then(liked => dispatch({ type: "LIKED_OR_NOT", payload: liked.data }) )
            .catch(err => dispatch({ type: "LIKED_OR_NOT_ERR", payload: err }) )
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
    LikedOrNot,
    likes,
    liked,
    unliked
}