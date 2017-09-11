const follow_defaults = {
  is_following: false,
  profile_views: 0,
  followers: [],
  followings: []
}

const follow = (state=follow_defaults, action) => {
	let { payload: py } = action

	switch (action.type) {
    case "IS_FOLLOWING":
      return { ...state, is_following: py }
      break

    case "GET_PROFILE_VIEWS":
      return { ...state, profile_views: py }
      break

    case "GET_FOLLOWERS":
      return { ...state, followers: py }
      break

    case "GET_FOLLOWINGS":
      return { ...state, followings: py }
      break

    case "FOLLOWER":
      return { ...state, followers: follower(state.followers, py) }
      break

    case "UNFOLLOWER":
      return { ...state, followers: unfollower(state.followers, py) }
      break

    case "FOLLOWING":
      return { ...state, followings: following(state.followings, py) }
      break

    case "UNFOLLOWING":
      return { ...state, followings: unfollowing(state.followings, py) }
      break

	}
	return state
}

const follower = (followers, n) => {
  followers.unshift(n)
  return followers
}

const unfollower = (followers, n) => {
  return followers.filter(ff => ff.follow_by !== parseInt(n) )
}

const following = (followings, n) => {
  followings.unshift(n)
  return followings
}

const unfollowing = (followings, n) => {
  return followings.filter(ff => ff.follow_to !== parseInt(n) )
}

export default follow
