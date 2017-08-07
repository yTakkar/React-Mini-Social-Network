import React from 'react'
import $ from 'jquery'
import axios from 'axios'
import { Helmet } from 'react-helmet'
import { connect } from 'react-redux'
import { Route, Link, Redirect } from 'react-router-dom'
import { FadeIn } from 'animate-components'
import P from 'bluebird'

import * as user_actions from '../../actions/user-action'
import * as notes_actions from '../../actions/notes-action'
import * as follow_action from '../../actions/follow-action'
import * as fn from '../../functions/functions'

import Banner from './banner-comp'
import Notes from './notes-comp'
import CreateNote from '../create-note/create-note-comp'
import Overlay from '../others/overlay-comp'
import Followers from './follow/followers-comp'
import Followings from './follow/followings-comp'

@connect(store => {
    return {
        store
    }
})

export default class Profile extends React.Component{

    state = { invalid_user: false }

    iur = () => this.setState({ invalid_user: true })

    componentDidMount = () => {
        let { match: { params: { username } }, dispatch, store: { user } } = this.props
        fn.forProfile(dispatch, username, this.iur )        
    }

    componentWillReceiveProps({ match, dispatch, store }) {
        if(this.props.match.url != match.url){
            fn.forProfile(dispatch, match.params.username, this.iur )
        }
    }

    render(){
        let 
            { invalid_user } = this.state,
            { match, match: { params: { username }, url }, store: { user } } = this.props,
            s_username = $('.data').data('username')

        return(
            <div>

                { invalid_user ? <Redirect to="/error/notfound" /> : null }

                <Helmet>
                    <title>{`@${username} • Notes App`}</title>
                </Helmet>  

                <div 
                    class='profile-data' 
                    id="profile-data" 
                    data-get-username={username} 
                    data-getid={user.user_details.id} 
                ></div>
                
                <FadeIn duration="300ms" >
                    <Banner url={match.url} />
                    <Notes/>
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
