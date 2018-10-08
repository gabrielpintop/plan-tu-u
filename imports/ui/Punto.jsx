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
            <div className="col-md-6 text-right col-12">
              <span className="font-weight-bold">
                {punto.idAsignacion} | {punto.puntos} puntos
              </span>
            </div>
            <div className=" col-12">
              <p>
                <b>Actividad: </b>
                {punto.descripcion}
              </p>
            </div>
            <div className="col-md-6 col-12">
              <b>Responsable: </b> {punto.idAsignador} - {punto.nombreAsignador}
            </div>
            <div className="col-md-6 col-12 text-right">
              <b>Fecha: </b>
              {punto.fecha}
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
