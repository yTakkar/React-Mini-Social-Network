import React from 'react'
import { CSSTransition } from 'react-transition-group'

const FadeTransition = (props) => (
  <CSSTransition
    {...props}
    classNames="fade"
    timeout={{ enter: 500, exit: 500 }}
  />
)

module.exports = {
    FadeTransition
}
