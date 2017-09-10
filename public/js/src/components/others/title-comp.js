import React from 'react'
import { Helmet } from 'react-helmet'
import PropTypes from 'prop-types'

export default class Title extends React.Component {
  render(){
    return (
      <Helmet>
        <title>{ this.props.value }</title>
      </Helmet>
    )
  }
}

React.propTypes = {
  value: PropTypes.string
}
