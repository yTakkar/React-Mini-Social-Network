import React from 'react'
import PropTypes from 'prop-types'

export default class Overlay extends React.Component{
    render(){
        let { visible } = this.props
        return(
            <div class={`${visible ? 'overlay' : 'hidden_overlay' }`} ></div>
        )
    }
}

Overlay.defaultProps = {
    visible: true
}

Overlay.propTypes = {
    visible: PropTypes.bool
}
