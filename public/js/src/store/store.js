import { applyMiddleware, combineReducers, createStore } from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import promise from 'redux-promise-middleware'

import user from '../reducers/user-reducer'
import notes from '../reducers/notes-reducer'
import follow from '../reducers/follow-reducer'
import explore from '../reducers/explore-reducer'
import note_int from '../reducers/note-int-reducer'

const reducers = combineReducers({
  user,
  notes,
  follow,
  explore,
  note_int
})

const middlewares = applyMiddleware(promise(), thunk, logger)

const store = createStore(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  middlewares
)

export default store
