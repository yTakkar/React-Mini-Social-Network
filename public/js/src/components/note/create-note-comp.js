import React from 'react'
import $ from 'jquery'
import { FadeIn } from 'animate-components'
import Title from '../others/title-comp'
import { connect } from 'react-redux'
import * as fn from '../../functions/functions'
import Goto from '../others/goto-comp'

@connect(store => {
	return {
		notes: store.notes
	}
})

export default class Create_note extends React.Component{

  back = e => fn.back(e, this.props.history)

  addNote = e => {
    e.preventDefault()
    let
      title = $('.c_n_middle input[type="text"]').val(),
      content = $('.c_n_middle textarea').val(),
      { dispatch, history } = this.props
    fn.createNote({ title, content, dispatch, history })
  }

  render(){
    return (
      <div class='create_note modal'>
        <Title value="Create note" />
        <FadeIn duration="300ms" >
          <form onSubmit={this.addNote} >
            <div className="c_n_header modal_header">
              <span className="title" >Create a note</span>
              <Goto />
            </div>
            <div className="c_n_middle modal_middle">
              <input type="text" placeholder='Title..' required spellCheck="false" autoComplete="false" autoFocus />
              <textarea placeholder='Your note..' required spellCheck='false' autoComplete='false' ></textarea>
            </div>
            <div className="c_n_bottom modal_bottom">
              <a href="#" className='c_n_cancel sec_btn' onClick={this.back} >Back</a>
              <input type="submit" className='c_n_add pri_btn' value='Add note' />
            </div>
          </form>
        </FadeIn>
      </div>
    )
  }

}
