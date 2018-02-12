import React from 'react'
import axios from 'axios'
import $ from 'jquery'
import TimeAgo from 'handy-timeago'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import * as fn from '../../functions/functions'

@connect(store => {
  return {}
})

export default class Like_items extends React.Component{

  state = { is_following: false }

  componentDidMount = async () => {
    let { like_by, like_by_username: username } = this.props
    if(!fn.Me(like_by)) {
      let { data } = await axios.post('/api/is-following', { username })
      this.setState({ is_following: data })
    }
  }

  follow = e => {
    e.preventDefault()
    let
      { like_by, like_by_username, dispatch } = this.props,
      getid = $('.profile_data').data('getid'),
      obj = {
        user: like_by,
        username: like_by_username,
        done: () => this.setState({ is_following: true })
      }
    fn.follow(obj)
  }

  unfollow = e => {
    e.preventDefault()
    let
      { like_by, dispatch } = this.props,
      getid = $('.profile_data').data('getid'),
      obj = {
        user: like_by,
        done: () => this.setState({ is_following: false })
      }
    fn.unfollow(obj)
  }

  render(){
    let
      { like_by, like_by_username, like_time } = this.props,
      { is_following } = this.state

    return(
        <div className="modal_items fer_items" >
          <div className="modal_it_img">
            <img src={ like_by ? `/users/${like_by}/user.jpg` : `/images/spacecraft.jpg`} />
          </div>
          <div className="modal_it_content">
            <div className="modal_it_info">
              <Link to={`/profile/${like_by_username}`} class='modal_it_username' >{like_by_username}</Link>
              <span class='modal_it_light' >{TimeAgo(like_time)}</span>
            </div>
            <div className="modal_ff">
              {
                fn.Me(like_by) ?
                  <Link to={`/profile/${like_by}`} class='pri_btn follow' >Profile</Link>
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
