import React from 'react'
import { Helmet } from 'react-helmet'
import { FadeIn } from 'animate-components'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import Follower_items from './follower-items'
import Goto from '../../others/goto-comp'
import Nothing from '../../others/nothing-comp'
import * as fn from '../../../functions/functions'

@connect(store => {
    return {
        follow: store.follow,
        user: store.user
    }
})

export default class Followers extends React.Component{

    back = e => fn.back(e, this.props.history)

    componentWillReceiveProps = props => fn.last_line_remover()
    componentDidMount = () => fn.last_line_remover()

    render(){        
        let
            { follow: { followers }, user: { user_details: { username } } } = this.props,
            map_f = followers.map(f => <Follower_items key={f.follow_id} {...f} /> )

        return(
            <div class='followers modal modal_big' >

                <Helmet>
                    <title>Followers • {`@${username}`}</title>
                </Helmet>

                <FadeIn duration="300ms" >
                    <div className="fer_header modal_header">
                        <span className="title" >Followers</span>
                        <Goto/>
                    </div>
                    <div className="fer_middle modal_middle">
                        <div className="modal_main">
                            {
                                followers.length == 0 ?
                                    <Nothing showMssg={false} />
                                :
                                    map_f
                            }
                        </div>
                    </div>
                    <div className="fer_bottom modal_bottom">
                        <Link className="sec_btn" to={`/profile/${username}`} >Close to view profile</Link>
                        <a href='#' className='fer_cancel pri_btn' onClick={this.back} >Back</a>
                    </div>
                </FadeIn>

            </div>
        )
    }
}