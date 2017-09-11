import React from 'react'
import { connect } from 'react-redux'
import Title from '../others/title-comp'
import { FadeIn } from 'animate-components'
import { get_explores } from '../../actions/explore-action'
import Explores from './explores-comp'

@connect(store => { return {} })

export default class Explore extends React.Component{

  componentDidMount = () => this.props.dispatch(get_explores())

  render(){
    return(
      <div className="explore" >

        <Title value="Explore • Notes App" />

        <FadeIn duration="300ms" >
          <div>
            <Explores />
          </div>
        </FadeIn>

      </div>
    )
  }
}
