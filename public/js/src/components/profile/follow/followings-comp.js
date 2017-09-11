import React from 'react'
import Title from '../../others/title-comp'
import { FadeIn } from 'animate-components'
import { connect } from 'react-redux'
import { Scrollbars } from 'react-custom-scrollbars'

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

  componentWillReceiveProps = props => fn.last_line_remover()
  componentDidMount = () => fn.last_line_remover()

  render(){
    let
      { follow: { followings }, user: { user_details: { username } } } = this.props,
      map_f = followings.map(f => <Following_items key={f.follow_id} {...f} /> )

    return(
      <div class='followers modal modal_big' >

        <Title value={`Followings • @${username}`} />

        <FadeIn duration="300ms" >
          <div className="fer_header modal_header">
            <span className="title" >Followers</span>
            <Goto />
          </div>
          <Scrollbars style={{ height: 450 }} className="fer_middle modal_middle">
            <div className="modal_main">
              { followings.length == 0 ? <Nothing showMssg={false} /> : map_f }
            </div>
          </Scrollbars>
          <div className="fer_bottom modal_bottom">
            <a href='#' className='fer_cancel pri_btn' onClick={this.back} >Back</a>
          </div>
        </FadeIn>

      </div>
    )
  }

}
