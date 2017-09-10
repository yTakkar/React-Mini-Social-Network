import React from 'react'
import ReactDOM from 'react-dom'
import store from '../store/store'
import { Provider } from 'react-redux'
import App from './app-comp'

let element = document.getElementById('root')
if (element){
  ReactDOM.render(
    <Provider store={store} >
      <App/>
    </Provider>,
    element
  )
}
