import React from 'react'
import PropTypes from 'prop-types'

export default class Hidden_overlay extends React.Component{
    render(){
        let { visible } = this.props
        return(
            <div class={`${visible ? 'overlay' : 'hidden_overlay' }`} ></div>
        )
    }
}

Hidden_overlay.defaultProps = {
    visible: true
}

Hidden_overlay.propTypes = {
    visible: PropTypes.bool
}
