import React from 'react'
import $ from 'jquery'
import { Link } from 'react-router-dom'
import Title from '../others/title-comp'
import { FadeIn } from 'animate-components'

export default class Error extends React.Component{
  render(){
    let
      username = $('.data').data('username'),
      { params: { what } } = this.props.match,
      title,
      desc

    if(what == "notfound"){
      title = "User not found"
      desc = "user"
    } else if(what == "note_notfound"){
      title = "Note not found"
      desc = "note"
    } else {
      title = "Error"
      desc = "page"
    }

    return(
      <div class='error' >
        <Title value="Oops! {title}" />
        <FadeIn duration="300ms" >
          <div className="welcome_div error_div">
            <div className="error_info">
              <span>Oops, the {desc} you're looking for does not exist!!</span>
            </div>
            <img src="/images/error-3.svg" alt="" />
            <div class="error_bottom">
              <Link to={`/profile/${username}`} className="sec_btn error_home" >View profile</Link>
              <Link to='/' className="pri_btn error_login" >Try going to homepage</Link>
            </div>
          </div>
        </FadeIn>
      </div>
    )
  }
}
