import React from 'react'
import $ from 'jquery'
import Title from '../others/title-comp'
import { FadeIn } from 'animate-components'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import Feeds from './feeds-comp'
import * as fn from '../../functions/functions'
import * as note_action from '../../actions/notes-action'

@connect(store => {
  return {
    notes: store.notes
  }
})

export default class Home extends React.Component{

  componentDidMount = () =>
    this.props.dispatch(note_action.getFeeds())

  render(){
    let
      s_username = $('.data').data('username'),
      { notes: { feeds } } = this.props,
      no_of_feeds = feeds.length == 0 ? "No feeds" : feeds.length == 1 ? '1 feed' : `${feeds.length} notes`

    return(
      <div class='home' >
        <Title value="Home" />
        <FadeIn duration="300ms" >
          <div className="home_info">
            <span>{no_of_feeds}</span>
            <Link
              to={{ pathname: `/profile/${s_username}/create-note` }}
              class={`pri_btn ${!fn.e_v() ? "a_disabled" : ""}`}
            >{fn.e_v() ? "Create note" : "Verify email to create note"}
            </Link>
          </div>
          <Feeds />
        </FadeIn>
      </div>
    )
  }
}
