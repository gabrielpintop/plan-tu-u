import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';

class BeneficioRedimido extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redimido: this.props.redimido,
      fechaRedimido: this.props.fechaRedimido,
      puntosRedimidos: this.props.puntosRedimidos
    };
  }

  componentWillReceiveProps(nextProps) {
      this.setState({
        redimido: nextProps.redimido,
        fechaRedimido: nextProps.fechaRedimido,
        puntosRedimidos: nextProps.puntosRedimidos
      });
  }

  render() {
    return (
      <li className="list-group-item">
        <div className="row">
          <div className="col-md-9 col-12">
            <p><b>Beneficio: </b>&nbsp;{this.state.redimido.beneficio}</p>
            <p><b>Puntos gastados: </b>{this.state.puntosRedimidos}</p>
            <p>Redimido el {this.state.fechaRedimido.substring(0, 10)} a las  {this.state.fechaRedimido.substring(11, 15)}</p>
          </div>
        </div>
      </li>
    );
  }
}

export default BeneficioRedimido;
