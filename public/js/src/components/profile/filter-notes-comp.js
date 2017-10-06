import React from 'react'

export default class Filter_notes extends React.Component {

	render(){
    let { notes_length, filter } = this.props

		return (
			<div className="filter_notes" >
        {
          notes_length != 0 ?
            <input
              type="text"
              placeholder="Search notes by title.."
              autoFocus={notes_length > 0}
              autoComplete={false}
              spellCheck={false}
              onChange={filter}
            />
          :
            null
        }
			</div>
    )

	}
}
