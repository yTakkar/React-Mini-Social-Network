import React, { Component, PropTypes } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Header from './others/header-comp'
import Profile from './profile/profile-comp'
import Home from './home/home-comp'
import Edit from './edit/edit-comp'
import Explore from './explore/explore-comp'
import Error from './error/error-comp'
import EmailVerification from './email-verification/email-ver-comp'
import Deactivate from './deactivate/deactivate-comp'
import Viewnote from './note/view-note-comp'
import Overlay from './others/overlay-comp'

export default class App extends Component{
  render(){
    return(
      <Router>
        <div className="app">
          <Header />
          <div className="notes_wrapper">
            <Route path="/view-note/:note" component={() => <Overlay type='colored' /> } />
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/explore" component={Explore} />
              <Route path="/edit" component={Edit} />
              <Route path="/profile/:username" component={Profile} />
              <Route path="/email-verification/:is" component={EmailVerification} />
              <Route path="/view-note/:note" component={Viewnote} />
              <Route path='/deactivate' component={Deactivate} />
              <Route path="/error/:what" component={Error} />
              <Route component={Error} />
            </Switch>
          </div>
        </div>
      </Router>
    )
  }
}
