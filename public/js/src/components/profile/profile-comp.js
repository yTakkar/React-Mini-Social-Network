import React from 'react'
import $ from 'jquery'
import axios from 'axios'
import Title from '../others/title-comp'
import { connect } from 'react-redux'
import { Route, Link, Redirect } from 'react-router-dom'
import { FadeIn } from 'animate-components'
import P from 'bluebird'

import * as user_actions from '../../actions/user-action'
import * as notes_actions from '../../actions/notes-action'
import * as follow_action from '../../actions/follow-action'
import * as fn from '../../functions/functions'

import Banner from './banner-comp'
import Filter_notes from './filter-notes-comp'
import Notes from './notes-comp'
import CreateNote from '../note/create-note-comp'
import Overlay from '../others/overlay-comp'
import Followers from './follow/followers-comp'
import Followings from './follow/followings-comp'

@connect(store => {
	return {
		store
	}
})

export default class Profile extends React.Component{

	state = {
		invalid_user: false,
		notes: []
	}

	iur = () => this.setState({ invalid_user: true })

	componentDidMount = () => {
		let {
      match: { params: { username } },
      dispatch,
      store: { user }
    } = this.props
		fn.forProfile({ dispatch, username, invalidUser: this.iur })
	}

	componentWillReceiveProps = ({ match, dispatch, store }) => {
		if(this.props.match.url != match.url){
			fn.forProfile({ dispatch, username: match.params.username, invalidUser: this.iur })
		}
		this.setState({ notes: store.notes.notes })
	}

	filter = e => {
		let
			{ store: { notes: { notes } } } = this.props,
			{ target: { value } } = e,
			f = notes.filter(el => el.title.toLowerCase().includes(value.toLowerCase()) )
		this.setState({ notes: f })
	}

	render(){
		let
			{ invalid_user, notes } = this.state,
			{ match, match: { params: { username }, url }, store: { user, notes: p_notes } } = this.props,
			s_username = $('.data').data('username')

		return(
			<div>

				{ invalid_user ? <Redirect to="/error/notfound" /> : null }

        <Title value={`@${username}`} />

				<div
					class='profile-data'
					id="profile-data"
					data-get-username={username}
					data-getid={user.user_details.id}
				></div>

				<FadeIn duration="300ms" >
					<div className="aligner">
						<Banner url={match.url} notes={notes} />
						<Filter_notes filter={this.filter} notes_length={p_notes.notes.length} />
						<Notes notes={notes} setState={this.setState} />
					</div>
				</FadeIn>

				{ fn.e_v() ? <Route path={`/profile/${s_username}/create-note`} component={Overlay} /> : null }
				{ fn.e_v() ? <Route path={`/profile/${s_username}/create-note`} component={CreateNote} /> : null }

				<Route path={`${match.url}/followers`} component={Overlay} />
				<Route path={`${match.url}/followers`} component={Followers} />

				<Route path={`${match.url}/followings`} component={Overlay} />
				<Route path={`${match.url}/followings`} component={Followings} />

			</div>
		)

	}
}
