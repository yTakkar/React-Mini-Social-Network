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

export default class Follower_items extends React.Component{

  state = { is_following: false }

  componentDidMount = async () => {
    let { follow_by, follow_by_username } = this.props
    if(!fn.Me(follow_by)) {
      let { data } = await axios.post('/api/is-following', { username: follow_by_username })
      this.setState({ is_following: data })
    }
  }

  follow = e => {
    e.preventDefault()
    let
      { dispatch, follow_by, follow_by_username, user: { user_details } } = this.props,
      obj = {
        user: follow_by,
        username: follow_by_username,
        dispatch,
        update_followings: fn.Me(user_details.id),
        done: () => this.setState({ is_following: true })
      }
    fn.follow(obj)
  }

  unfollow = e => {
    e.preventDefault()
    let
      { dispatch, follow_by, user: { user_details } } = this.props,
      obj = {
        user: follow_by,
        dispatch,
        update_followings: fn.Me(user_details.id),
        done: () => this.setState({ is_following: false })
      }
    fn.unfollow(obj)
  }

  render(){
    let
      { follow_by, follow_by_username, follow_time } = this.props,
      { is_following } = this.state

    return (
      <div className="modal_items fer_items" >
        <div className="modal_it_img">
          <img src={ follow_by ? `/users/${follow_by}/user.jpg` : `/images/spacecraft.jpg`} />
        </div>
        <div className="modal_it_content">
          <div className="modal_it_info">
            <Link to={`/profile/${follow_by_username}`} class='modal_it_username' >{follow_by_username}</Link>
            <span class='modal_it_light' >{TimeAgo(follow_time)}</span>
          </div>
          <div className="modal_ff">
            {
              fn.Me(follow_by) ?
                <Link to={`/profile/${follow_by_username}`} class='pri_btn follow' >Profile</Link>
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
