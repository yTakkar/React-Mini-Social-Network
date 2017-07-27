const def_notes = {
    notes: [],
    feeds: []
}

const notes = (state=def_notes, action) => {
    switch (action.type) {
        case "GET_NOTES": 
            return { ...state, notes: action.payload }
            break;
        
        case "GET_FEEDS": 
            return { ...state, feeds: action.payload }
            break;
        
        case "UPDATE_NOTES": 
            return { ...state, notes: update(state.notes, action.payload) }
            break;
        
        case "DELETE_NOTES": 
            return { ...state, notes: dlt(state.notes, action.payload) }
            break;
        
        case "EDIT_NOTE": 
            return { ...state, notes: edit(state.notes, action.payload) }
            break;
    
    }
    return state
}

const update = (notes, note) => {
    notes.unshift(note)
    return notes
}

const dlt = (notes, note) => {
    return notes.filter(n => n.note_id != parseInt(note) )
}

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