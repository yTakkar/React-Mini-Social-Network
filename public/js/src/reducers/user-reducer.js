const def_user = {
  user_details: {}
}

const user = (state=def_user, action) => {
  switch (action.type) {
    case "USER_DETAILS":
      return { ...state, user_details: action.payload }
      break
  }
  return state
}

export default user
