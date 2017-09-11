import React from 'react'
import $ from 'jquery'
import PropTypes from 'prop-types'
import { FadeIn } from 'animate-components'

export default class Prompt extends React.Component{

  componentDidMount = () => $('.prompt-done').focus()

  render(){
    let { title, content, actionText, action, state_updater, close } = this.props

    return (
      <div class="prompt">
        <FadeIn duration="200ms" >
          <div class="prompt-top">
            <span class="prompt-title">{title}</span>
            <span onClick={() => close(null, state_updater)} ><i class="material-icons">clear</i></span>
          </div>
          <div class="prompt-middle">
            <span class="prompt-content">{content}</span>
          </div>
          <div class="prompt-bottom">
            <a href="#" class="sec_btn prompt-cancel" onClick={e => close(e, state_updater)} >Cancel</a>
            <a href="#" class="pri_btn prompt-done" onClick={action} >{actionText}</a>
          </div>
        </FadeIn>
      </div>
    )

  }

}

Prompt.defaultProps = {
  title: "Title",
  content: "Main content goes here. Content should be of 2 lines to avoid the blur that Chrome creates!",
  actionText: "Action",
  action: () => { return false; }
}

Prompt.propTypes = {
  title: PropTypes.string,
  content: PropTypes.string,
  actionText: PropTypes.string,
  action: PropTypes.func
}
