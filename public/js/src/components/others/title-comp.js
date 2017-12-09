import React from 'react'
import { Helmet } from 'react-helmet'
import PropTypes from 'prop-types'

export default class Title extends React.Component {
  render(){
    return (
      <Helmet>
        <title>{ this.props.value } • Mini Social Network</title>
      </Helmet>
    )
  }
}

Title.propTypes = {
  value: PropTypes.string
}
