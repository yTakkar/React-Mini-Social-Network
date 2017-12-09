import React from 'react'
import PropTypes from 'prop-types'
import Title from '../others/title-comp'
import { FadeIn } from 'animate-components'

export default class EmailVerification extends React.Component{
  render(){
    let
      { params: { is } } = this.props.match,
      mssg

    if(is == "yes"){
      mssg = "You email has been verified successfully!"
    } else if(is == "alr"){
      mssg = "Email already verified!"
    } else {
      mssg = "Something went wrong!"
    }

    return(
      <div>
        <Title value="E-mail verification"/>
        <FadeIn duration="300ms" >
          <div class="registered">
            <span>{mssg}</span>
          </div>
        </FadeIn>
      </div>
    )
  }
}
