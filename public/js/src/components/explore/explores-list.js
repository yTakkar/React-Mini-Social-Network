import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import * as fn from '../../functions/functions'

export default class Explores_list extends React.Component{

  state = {
    no_of_notes: 0,
    is_following: false
  }

  componentDidMount = async () => {
    let
      { dispatch, id, username } = this.props,
      { data: no_of_notes } = await axios.post('/api/no-of-notes', { user: id }),
      { data: is_following } = await axios.post('/api/is-following', { username })
    this.setState({ no_of_notes, is_following })
  }

  follow = e => {
    e.preventDefault()
    let
      { id, username } = this.props,
      obj = {
        user: id,
        username,
        done: () => this.setState({ is_following: true })
      }
    fn.follow(obj)
  }

  unfollow = e => {
    e.preventDefault()
    let
      { id, username } = this.props,
      obj = {
        user: id,
        done: () => this.setState({ is_following: false })
      }
    fn.unfollow(obj)
  }

  render(){
    let
      { id, username, email } = this.props,
      { no_of_notes, is_following } = this.state,
      n = no_of_notes == 0 ? '0 notes' : no_of_notes == 1 ? '1 note' : `${no_of_notes} notes`

    return(
      <div className="explores_list" >
        <div className="exl_main">
          <img src={id ? `/users/${id}/user.jpg` : '/images/spacecraft.jpg'} />
          <div className="exl_content">
            <Link to={`/profile/${username}`} className="exl_username" >{username}</Link>
            <div className="exl_desc">
              <span className="exl_email">{email}</span>
              <span className="exl_desc_sep">•</span>
              <span className="exl_followers">{n}</span>
            </div>
          </div>
        </div>
        <div className="exl_ff">
          {
            is_following ?
              <a href="#" className="pri_btn unfollow exl_unfollow" onClick={this.unfollow} >Followed</a>
              :
              <a href="#" className="pri_btn follow exl_follow" onClick={this.follow} >Follow</a>
          }
        </div>
      </div>
    )
  }
}
