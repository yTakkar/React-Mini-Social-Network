import React from 'react'
import { connect } from 'react-redux'

import Nothing from '../others/nothing-comp'
import End from '../others/end-comp'
import Note from '../note/note-comp'
import * as fn from '../../functions/functions'

@connect(store => {
	return {
		user: store.user,
		note: store.notes
	}
})

export default class Notes extends React.Component{
	render(){
    let
      { notes,
        user: { user_details: { username, id } }
      } = this.props,
      map_notes = notes.map(note =>
        <Note key={note.note_id} {...note} />
      )

		return(
			<div class='notes' >
				{
					notes.length == 0 ?
						<Nothing mssg={ fn.Me(id) ? "You got no notes" : `${username} got no notes!`} />
					:
						map_notes
				}
				{ notes.length != 0 ? <End/> : null }
			</div>
		)

	}
}
