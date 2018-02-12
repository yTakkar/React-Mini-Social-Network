import React from 'react'
import { connect } from 'react-redux'
import Title from '../others/title-comp'
import { FadeIn } from 'animate-components'
import { Scrollbars } from 'react-custom-scrollbars'
import * as fn from '../../functions/functions'

import Goto from '../others/goto-comp'
import Nothing from '../others/nothing-comp'
import Like_items from './like-items'

@connect(store => {
  return {
    note_int: store.note_int
  }
})

export default class Likes extends React.Component{

  back = e => fn.back(e, this.props.history)

  componentDidMount = () => fn.last_line_remover()
  componentDidUpdate = () => fn.last_line_remover()

  render(){
    let
      { note_int: { likes, note_details: { note_id } } } = this.props,
      map_l = likes.map(l =>
        <Like_items key={l.like_id} {...l} />
      )

    return(
        <div class='likes modal modal_big' >
          <Title value="Likes" />
          <FadeIn duration="300ms" >
            <div className="likes_header modal_header">
              <span className="title" >Likes</span>
              <Goto />
            </div>
            <Scrollbars style={{ height: 450 }} className="likes_middle modal_middle">
              <div className="modal_main">
                { likes.length == 0 ? <Nothing showMssg={false} /> : map_l }
              </div>
            </Scrollbars>
            <div className="likes_bottom modal_bottom">
              <a href='#' className='likes_cancel pri_btn' onClick={this.back} >Back</a>
            </div>
          </FadeIn>
        </div>
    )
  }
}
