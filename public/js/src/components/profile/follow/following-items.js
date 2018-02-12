import React from 'react'
import axios from 'axios'
import $ from 'jquery'
import TimeAgo from 'handy-timeago'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import * as fn from '../../../functions/functions'

@connect(store => {
  return {
    user: store.user
  }
})

export default class Following_items extends React.Component{

  state = { is_following: false }

  componentDidMount = async () => {
    let { follow_to, follow_to_username } = this.props
    if(!fn.Me(follow_to)) {
      let { data } = await axios.post('/api/is-following', { username: follow_to_username })
      this.setState({ is_following: data })
    }
  }

  follow = e => {
    e.preventDefault()
    let
      { dispatch, follow_to, follow_to_username, user: { user_details } } = this.props,
      obj = {
        user: follow_to,
        username: follow_to_username,
        dispatch,
        update_followings: fn.Me(user_details.id)
      }
    fn.follow(obj)
    this.setState({ is_following: true })
  }

  unfollow = e => {
    e.preventDefault()
    let
      { dispatch, follow_to, user: { user_details } } = this.props,
      obj = {
        user: follow_to,
        dispatch,
        update_followings: fn.Me(user_details.id)
      }
    fn.unfollow(obj)
    this.setState({ is_following: false })
  }

  render(){
    let
      { follow_to, follow_to_username, follow_time } = this.props,
      { is_following } = this.state

    return (
      <div className="modal_items fer_items" >
        <div className="modal_it_img">
          <img src={ follow_to ? `/users/${follow_to}/user.jpg` : `/images/spacecraft.jpg`} />
        </div>
        <div className="modal_it_content">
          <div className="modal_it_info">
            <Link to={`/profile/${follow_to_username}`} class='modal_it_username' >{follow_to_username}</Link>
            <span class='modal_it_light' >{TimeAgo(follow_time)}</span>
          </div>
          <div className="modal_ff">
            {
              fn.Me(follow_to) ?
                <Link to={`/profile/${follow_to_username}`} class='pri_btn follow' >Profile</Link>
              : is_following ?
                <a href="#" class='pri_btn unfollow' onClick={this.unfollow} >Unfollow</a>
              :
                <a href="#" class='pri_btn follow' onClick={this.follow} >Follow</a>
            }
          </div>
        </div>
        <hr />
      </div>
    )

  }

}
