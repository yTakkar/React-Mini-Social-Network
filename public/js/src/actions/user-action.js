import axios from 'axios'

const user_details = get => {
    return dispatch => {
        axios.post('/api/get-details', { get })
            .then(get => dispatch({type: "USER_DETAILS", payload: get.data }) )
            .catch(err => dispatch({ type: "USER_DETAILS_ERR", payload: err }) )
    }
}

module.exports = {
    user_details
}
