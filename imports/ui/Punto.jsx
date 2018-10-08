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
          <div className="row">
            <div className="col-md-6 col-12">
              <p>
                <b>Usuario: </b>
                {punto.idUsuario} - {punto.nombreUsuario}
              </p>
            </div>
            <div className="col-md-6 text-left col-12 font-weight-bold">
              {punto.idAsignacion}
            </div>

            <div className="col-md-10 col-12">
              <p>
                <b>Actividad: </b>
                {punto.descripcion}
              </p>
            </div>
            <div className="col-md-2 col-12">
              <p>
                <b>Puntos asignados: </b>
                {punto.puntos}
              </p>
            </div>
            <div className="col-md-6 col-12">
              Fecha: {punto.fecha.substring(0, 10)} a las{' '}
              {punto.fecha.substring(11, 20)}
              &nbsp;
            </div>
            <div className="col-md-6 col-12">
              <b>Responsable: </b> {punto.idAsignador} - {punto.nombreAsignador}
            </div>
          </div>
        </li>
      );
    } else {
      return (
        <li className="list-group-item">
          <p>
            <b>Fecha obtenido: </b> {this.state.punto.fecha}
            <br />
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
