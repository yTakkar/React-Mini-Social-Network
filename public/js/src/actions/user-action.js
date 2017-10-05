import { post } from 'axios'

const user_details = get => {
  return dispatch => {
    post('/api/get-details', { get })
      .then(get => dispatch({type: "USER_DETAILS", payload: get.data }) )
      .catch(err => console.log(err) )
  }
}

module.exports = {
  user_details
}
