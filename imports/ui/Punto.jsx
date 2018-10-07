import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';

class Punto extends Component {
  constructor(props) {
    super(props);

    this.state = {
      punto: this.props.punto,
      admin: this.props.admin
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      punto: nextProps.punto,
      admin: nextProps.admin
    });
  }

  mostrarContenidoUsuario() {
    let punto = this.state.punto;
    if (this.state.admin) {
      return (
        <li className="list-group-item">
          <div className="col-12">
            <p>
              <b>Actividad: </b>
              {punto.descripcion}
            </p>
            <p>
              <b>Realizada por el usuario </b>
              {punto.idUsuario}
            </p>
            <p>
              <b>Puntos asignados: {punto.puntos} </b>
              (el {punto.fecha.substring(0, 10)} a las{' '}
              {punto.fecha.substring(11, 20)}
              &nbsp;por el administrador {punto.idAsignador})
            </p>
          </div>
        </li>
      );
    } else {
      return (
        <li className="list-group-item">
          <p>
            <b>Actividad: </b>
            {this.state.punto.descripcion}
            <br />¡ Ganaste{' '}
            <b className="text-uniandes">{this.state.punto.puntos}</b> puntos
            por esta actividad !
          </p>
        </li>
      );
    }
  }

  render() {
    return this.mostrarContenidoUsuario();
  }
}

export default Punto;
