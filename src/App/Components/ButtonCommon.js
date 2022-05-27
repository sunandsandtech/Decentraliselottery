import React, { Component } from "react";
import { Button } from "react-bootstrap";
class ButtonCommon extends Component {
  render() {
    return (
      <Button
      style={this.props.style}
        type={this.props.type}
        className={this.props.className}
        onClick={this.props.handleClick}
      >
        {this.props.label}
      </Button>
    );
  }
}

export default ButtonCommon;
