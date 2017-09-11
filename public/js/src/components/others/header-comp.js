import React from 'react'
import $ from 'jquery'
import { NavLink } from 'react-router-dom'

export default class Header extends React.Component{
  render(){
    let
      username = $('.data').data('username'),
      id = $('.data').data('session')

    return (
      <div class='header_loggedin' >
        <div class="left">
          <NavLink activeClassName="ha_active" exact={true} to="/" >Home</NavLink>
          <NavLink activeClassName="ha_active" to="/explore" >Explore</NavLink>
          <NavLink activeClassName="ha_active" to="/deactivate" >Deactivate</NavLink>
        </div>
        <div className="right">
          <NavLink activeClassName="ha_active" to={`/profile/${username}`} className='vp' >{username}</NavLink>
          <NavLink activeClassName="ha_active" to="/edit" >Edit profile</NavLink>
          <a href="/logout" >Logout</a>
        </div>
      </div>
    )
  }
}
