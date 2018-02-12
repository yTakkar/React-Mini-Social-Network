import React from 'react'
import $ from 'jquery'
import axios from 'axios'
import { connect } from 'react-redux'
import Title from '../others/title-comp'
import { FadeIn } from 'animate-components'
import Notify from 'handy-notification'
import TimeAgo from 'handy-timeago'
import P from 'bluebird'
import * as fn from '../../functions/functions'
import * as user_action from '../../actions/user-action'

@connect(store => {
  return {
    user: store.user
  }
})

export default class Edit extends React.Component{

  state = {
    username: "",
    email: "",
    bio: "",
    file: ""
  }

  componentDidMount = () => {
    let
      { dispatch } = this.props,
      username = $('.data').data('username')
    dispatch(user_action.user_details(username))
  }

  componentWillReceiveProps = ({ user: { user_details: { username, email, bio } }}) =>
    this.setState({ username, email, bio })

  update_ = (e, what) => {
    this.setState({ [what]: e.target.value })
  }

  edit_profile = e => {
    e.preventDefault()
    let
      { username: susername, email: semail } = this.props.user.user_details,
      { username, email, bio } = this.state
    fn.edit_profile({ susername, semail, username, email, bio })
  }

  change_avatar = e => {
    this.update_(e, "file")
    fn.change_avatar({ file: e.target.files[0] })
  }

  resend_vl = e => {
    e.preventDefault()
    fn.resend_vl()
  }

    render(){
      let
        { username, email, bio, file } = this.state,
        { id, joined } = this.props.user.user_details

      return(
        <div class='edit'>

          <Title value="Edit profile" />

          <FadeIn duration="300ms" className="edit_animation" >
            <div class="edit_info">
              <img
                className="edit_img"
                src={id ? `/users/${id}/user.jpg` : "/images/spacecraft.jpg" }
                alt="Your avatar"
              />
              <span>{`@${username}`}</span>
            </div>
            <div className="eu_div">
              <span class='edit_span'>Username</span>
              <input
                type="text"
                class='e_username'
                placeholder='Username..'
                autoComplete='false'
                autoFocus
                spellCheck='false'
                value={username}
                onChange={e => this.update_(e, "username")}
              />
            </div>
            <div className="ee_div">
              <span class='edit_span'>Email</span>
              <input
                type="email"
                class='e_email'
                placeholder='Email..'
                autoComplete='false'
                spellCheck='false'
                value={email}
                onChange={e => this.update_(e, "email")}
              />
            </div>
            <div className="eb_div">
              <span class='edit_span'>Bio</span>
              <textarea
                class="e_bio"
                placeholder='Bio..'
                spellCheck='false'
                value={bio}
                onChange={e => this.update_(e, "bio")}
              ></textarea>
            </div>
            <div className="eb_btns">
              <form class='avatar_form' method="post" encType='multipart/formdata' >
                <input
                  type="file"
                  name="avatar"
                  id="avatar_file"
                  accept="image/*"
                  value={file}
                  onChange={this.change_avatar}
                />
                <label
                  for="avatar_file"
                  class={`avatar_span sec_btn ${!fn.e_v() ? "sec_btn_disabled" : ""}`}
                >{fn.e_v() ? "Change avatar" : "Verify email to change avatar"}</label>
              </form>
              <a href="#" className="pri_btn e_done" onClick={this.edit_profile} >Done editing</a>
            </div>
            <div className="e_joined">
              <span>{`You joined Notes App ${TimeAgo(joined)}`}</span>
            </div>

            {
              !fn.e_v() ?
                <div className="resend_vl_div" >
                  <a href='#' className="pri_btn resend_vl" onClick={this.resend_vl} >Resend verification link</a>
                </div>
              : null
            }

          </FadeIn>

        </div>
      )

    }
}
