// USER SYSTEM
import './user-system/user-system'

// FOR LOGGEDIN USER
import React from 'react'
import ReactDOM from 'react-dom'
import store from './store/store'
import { Provider } from 'react-redux'
import App from './components/app-comp'

let element = document.getElementById('root')
if (element) {
  ReactDOM.render(
    <Provider store={store} >
      <App />
    </Provider>,
    element
  )
}
