import { post } from 'axios'

const get_profile_views = username => {
  return dispatch => {
    post('/api/get-profile-views', { username })
      .then(view => dispatch({ type: "GET_PROFILE_VIEWS", payload: view.data }) )
      .catch(err => console.log(err) )
  }
}

const is_following = username => {
  return dispatch => {
    post('/api/is-following', { username })
      .then(is => dispatch({ type: "IS_FOLLOWING", payload: is.data }) )
      .catch(err => console.log(err) )
  }
}

const get_followers = username => {
  return dispatch => {
    post('/api/get-followers', { username })
      .then(followers => dispatch({ type: "GET_FOLLOWERS", payload: followers.data }) )
      .catch(err => console.log(err) )
  }
}

const get_followings = username => {
  return dispatch => {
    post('/api/get-followings', { username })
      .then(following => dispatch({ type: "GET_FOLLOWINGS", payload: following.data }) )
      .catch(err => console.log(err) )
  }
}

const follower = follower => {
  return {
    type: "FOLLOWER",
    payload: follower
  }
}

const unfollower = unfollower => {
  return{
    type: "UNFOLLOWER",
    payload: unfollower
  }
}

const following = following => {
  return{
    type: "FOLLOWING",
    payload: following
  }
}

const unfollowing = unfollowing => {
  return {
    type: "UNFOLLOWING",
    payload: unfollowing
  }
}

module.exports = {
  get_profile_views,
  is_following,
  get_followers,
  get_followings,
  follower,
  unfollower,
  following,
  unfollowing
}
