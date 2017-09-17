import React from 'react'
import PropTypes from 'prop-types'

export default class Overlay extends React.Component{
  render(){
    let
      { type } = this.props,
      cls

    if(type == 'black'){
      cls = 'overlay'
    } else if (type == 'white'){
      cls = 'hidden_overlay'
    } else if (type == 'colored'){
      cls = 'colored_overlay'
    }

    return (
      <div class={cls} ></div>
    )
  }
}

Overlay.defaultProps = {
  type: 'black'
}

Overlay.propTypes = {
  type: PropTypes.string
}
