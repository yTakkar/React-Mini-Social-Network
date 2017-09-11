const def_notes = {
  notes: [],
  feeds: []
}

const notes = (state=def_notes, action) => {
	let { payload: py } = action

	switch (action.type) {
  case "GET_NOTES":
    return { ...state, notes: py }
    break

  case "GET_FEEDS":
    return { ...state, feeds: py }
    break

  case "UPDATE_NOTES":
    return { ...state, notes: update(state.notes, py) }
    break

  case "DELETE_NOTES":
    return { ...state, notes: dlt(state.notes, py) }
    break

  case "EDIT_NOTE":
    return { ...state, notes: edit(state.notes, py) }
    break

	}
	return state
}

const update = (notes, note) => {
	notes.unshift(note)
	return notes
}

const dlt = (notes, note) => notes.filter(n => n.note_id != parseInt(note) )

const edit = (notes, note) => {
	return notes.map(n => {
		if(n.note_id == note.note_id){
			n.title = note.title
			n.content = note.content
		}
		return n
	})
}

export default notes
