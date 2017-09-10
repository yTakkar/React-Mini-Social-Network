import React from 'react'
import $ from 'jquery'

export default class End extends React.Component{

  toTop = () => {
    $('html, body').animate({ scrollTop: 0 }, 450)
  }

  render(){
    return(
      <div className="page_end" onClick={this.toTop} >
        <span>{this.props.mssg}</span>
      </div>
    )
  }
}

End.defaultProps = {
  mssg: "Looks like you've reached the end"
}
