import React, { Component } from 'react';

export default class Beneficio extends Component {
  render() {
    return (
      <li>
        {this.props.beneficio.beneficio} -{' '}
        {this.props.beneficio.puntosRequeridos}
      </li>
    );
  }
}
