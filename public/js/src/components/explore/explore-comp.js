import React from 'react'
import { connect } from 'react-redux'
import Title from '../others/title-comp'
import { FadeIn } from 'animate-components'
import { get_explores } from '../../actions/explore-action'
import Explores_list from './explores-list'
import Nothing from '../others/nothing-comp'
import End from '../others/end-comp'

@connect(store => {
  return {
    explore: store.explore.explores
  }
})

export default class Explore extends React.Component {

  componentDidMount = () => this.props.dispatch(get_explores())

  render(){
    let
      { explore } = this.props,
      map_explore = explore.map(e =>
        <Explores_list key={e.id} {...e} />
      )

    return(
      <div className="explore" >

        <Title value="Explore" />

        <FadeIn duration="300ms" >
          <div className="explores" >
            {explore.length == 0 ? <Nothing mssg="No one to explore!!" /> : map_explore}
            {explore.length != 0 ? <End /> : null}
          </div>
        </FadeIn>

      </div>
    )
  }
}
