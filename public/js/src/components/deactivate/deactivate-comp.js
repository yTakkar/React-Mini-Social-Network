import React from 'react'
import $ from 'jquery'
import axios from 'axios'
import { FadeIn } from 'animate-components'
import Title from '../others/title-comp'
import * as fn from '../../functions/functions'

import Overlay from '../others/overlay-comp'
import Prompt from '../others/prompt-comp'

export default class Deactivate extends React.Component{

  state = { deactivate: false }

  toggle_ = (e, what) => {
    e ? e.preventDefault() : null
    switch (what) {
      case "deactivate":
        this.setState(state => ({ deactivate: !state.deactivate }))
        break
    }
  }

  deactivate = e => {
    e.preventDefault()
    fn.deactivate()
  }

  render(){
    let { deactivate } = this.state

    return (
      <div>
        <Title value="Deactivate your account" />
        <FadeIn duration="300ms" >
          <div class="registered deactivate" >
            <span className="deactivate_title" >Deactivate your account?</span>
            <span>All of your notes, followers, followings & info will be permanently deleted. And you won't be able to find it again.</span>
            <div className="deactivate_btn">
              <a href="#" className="pri_btn d_btn" onClick={e => this.toggle_(e, "deactivate")} >Deactivate</a>
            </div>
          </div>
        </FadeIn>

        {deactivate ? <Overlay /> : null}
        {
          deactivate ?
            <Prompt
              title="Deactivate your account"
              content="Are you sure, you wanna permanently deactivate your account? There's no undo so you won't be able login with this account."
              actionText="Deactivate"
              action={this.deactivate}
              state_updater="deactivate"
              close={this.toggle_}
            />
          : null
        }

      </div>
    )
  }

}
