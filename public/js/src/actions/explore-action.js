import { post } from 'axios'

const get_explores = () => {
  return dispatch => {
    post('/api/explore')
      .then(exp => dispatch({ type: "GET_EXPLORES", payload: exp.data }) )
      .catch(err => console.log(err) )
  }
}

module.exports = {
  get_explores
}
