import React from 'react'
import $ from 'jquery'
import * as fn from '../../functions/functions'
import TimeAgo from 'handy-timeago'
import { Link } from 'react-router-dom'

export default class Note extends React.Component{
  render(){
    let { title, content, note_id, user, username, note_time } = this.props

    return(
      <Link to={{ pathname:`/view-note/${note_id}`, state: { modal: true } }}>
        <div class='note' data-note={note_id}  >
          <div className="note_header common_header">
            <img src={ user ? `/users/${user}/user.jpg` : '/images/spacecraft.jpg' } alt=""/>
            <div className="note_h_left">
              <span className="note_username">{username}</span>
              <span className='note_time' >{TimeAgo(note_time)}</span>
            </div>
          </div>
          <div className="note_title">
            <span>{fn.c_first(title)}</span>
          </div>
          <div className="note_content">
            <span>{fn.shortener(fn.c_first(content), 500)}</span>
          </div>
        </div>
      </Link>
    )
  }
}
