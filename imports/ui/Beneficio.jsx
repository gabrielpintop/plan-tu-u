import React, { Component } from 'react';

export default class Beneficio extends Component {
  render() {
    return (
      <li className="list-group-item">
        <div className="row">
          <div className="col-md-9 col-12">
            <p>{this.props.beneficio.beneficio}</p>
          </div>
          <div className="col-md-3 col-12 font-weight-bold text-right">
            <button type="button" className="btn btn-primary">
              Redimir - <b>{this.props.beneficio.puntosRequeridos}</b> puntos
            </button>
          </div>
        </div>
      </li>
    );
  }
}
