import axios from 'axios'

const get_explores = () => {
  return dispatch => {
    axios.post('/api/explore')
      .then(exp => dispatch({ type: "GET_EXPLORES", payload: exp.data }) )
      .catch(err => dispatch({ type: "GET_EXPLORES_ERR", payload: err }) )
  }
}

module.exports = {
  get_explores
}
