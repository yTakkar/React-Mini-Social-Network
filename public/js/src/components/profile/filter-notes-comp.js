import React from 'react'
import * as notes_action from '../../actions/notes-action'

export default class Filter_notes extends React.Component {

	render(){
		return (
			<div className="filter_notes" >
				<input
					type="text"
					placeholder="Search notes by title.."
					autoFocus={true}
					autoComplete={false}
					spellCheck={false}
					onChange={this.props.filter} />
			</div>
		)
	}
}
