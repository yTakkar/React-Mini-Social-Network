import React from 'react'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'
import { FadeIn } from 'animate-components'
import * as fn from '../../functions/functions'

import Nothing from '../others/nothing-comp'
import Like_items from './like-items'

@connect(store => {
    return {
        note_int: store.note_int
    }
})

export default class Likes extends React.Component{

    back = e => fn.back(e, this.props.history)

    render(){
        let 
            { note_int: { likes } } = this.props,
            map_l = likes.map(l => <Like_items key={l.like_id} {...l} /> )

        return(
            <div class='likes modal modal_big' >

                <Helmet>
                    <title>Likes • Notes App</title>
                </Helmet>

                <FadeIn duration="300ms" >
                    <div className="likes_header modal_header">
                        <span className="title" >Likes</span>
                    </div>
                    <div className="likes_middle modal_middle">
                        <div className="modal_main">
                            {
                                likes.length == 0 ?
                                    <Nothing showMssg={false} />
                                : 
                                    map_l
                            }
                        </div>
                    </div>
                    <div className="likes_bottom modal_bottom">
                        <a href='#' className='likes_cancel pri_btn' onClick={this.back} >Close</a>
                    </div>
                </FadeIn>

            </div>
        )
    }
}