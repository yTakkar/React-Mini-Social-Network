import React from 'react'
import $ from 'jquery'
import { connect } from 'react-redux'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import { FadeTransition } from '../others/transitions-comp'

import Nothing from '../others/nothing-comp'
import End from '../others/end-comp'
import Note from '../note/note-comp'
import * as fn from '../../functions/functions'

@connect(store => {
    return {
        notes: store.notes
    }
})

export default class Feeds extends React.Component{
    render(){
        let 
            { notes: { feeds } } = this.props,
            map_feeds = feeds.map(feed => {
                return(
                    <FadeTransition key={feed.note_id} >
                        <Note {...feed} />
                    </FadeTransition>
                )
            })
    
        return(
            <div class='feeds_wrapper' >
                 {
                    feeds.length == 0 ?
                        <Nothing mssg="No feeds available!" /> 
                    :
                        <TransitionGroup>
                           { map_feeds }
                        </TransitionGroup>
                }
                { feeds.length != 0 ? <End/> : null } 
            </div>
        )
    }
}