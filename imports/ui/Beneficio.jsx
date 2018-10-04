import React, { Component } from 'react';

// Task component - represents a single todo item
export default class Task extends Component {
  render() {
    return (
      <li>
        {this.props.beneficio.beneficio} -{' '}
        {this.props.beneficio.puntosRequeridos}
      </li>
    );
  }
}
