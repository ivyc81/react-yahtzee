import React, { Component } from "react";
import "./Die.css";


/**
 * presentational component
 * display value
 * diaplay according to locked or not
 */

class Die extends Component {
  render() {
    return (
      <button
        className={this.props.locked ? "Die Die-locked" : "Die"}
        onClick={() => this.props.handleClick(this.props.idx)}>
        {this.props.val}
      </button>
    );
  }
}

export default Die;
