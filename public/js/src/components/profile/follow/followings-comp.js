import React from 'react'
import { Helmet } from 'react-helmet'
import { FadeIn } from 'animate-components'
import { connect } from 'react-redux'

import Following_items from './following-items'
import Goto from '../../others/goto-comp'
import Nothing from '../../others/nothing-comp'
import * as fn from '../../../functions/functions'

@connect(store => {
    return {
        follow: store.follow,
        user: store.user
    }
})

export default class Followings extends React.Component{

    back = e => fn.back(e, this.props.history)

    render(){        
        let
            { follow: { followings }, user: { user_details: { username } } } = this.props,
            map_f = followings.map(f => <Following_items key={f.follow_id} {...f} /> )

        return(
            <div class='followers modal modal_big' >

                <Helmet>
                    <title>Followings • {`@${username}`}</title>
                </Helmet>

                <FadeIn duration="300ms" >
                    <div className="fer_header modal_header">
                        <span className="title" >Followers</span>
                        <Goto/>
                    </div>
                    <div className="fer_middle modal_middle">
                        <div className="modal_main">
                            {
                                followings.length == 0 ?
                                    <Nothing showMssg={false} />
                                :
                                    map_f
                            }
                        </div>
                    </div>
                    <div className="fer_bottom modal_bottom">
                        <a href='#' className='fer_cancel pri_btn' onClick={this.back} >Close</a>
                    </div>
                </FadeIn>

            </div>
        )
    }
}