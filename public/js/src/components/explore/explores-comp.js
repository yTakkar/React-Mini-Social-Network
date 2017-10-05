import React from 'react'
import { connect } from 'react-redux'

import Explores_list from './explores-list'
import Nothing from '../others/nothing-comp'
import End from '../others/end-comp'

@connect(store => {
  return {
    explore: store.explore.explores
  }
})

export default class Explores extends React.Component{
  render(){
    let
      { explore } = this.props,
      map_explore = explore.map(e => <Explores_list key={e.id} {...e} /> )

    return(
      <div className="explores" >
        { explore.length == 0 ? <Nothing mssg="No one to explore!!" /> : map_explore }
        { explore.length != 0 ? <End/> : null }
      </div>
    )
  }
}
