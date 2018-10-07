import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';

class Obtenido extends Component {
  constructor(props) {
    super(props);

    this.state = {
        descripcion: this.props.descripcion,
        puntosAsignados: this.props.puntosAsignados,
        fechaCreacion: this.props.fechaCreacion,
        idUsuario: this.props.idUsuario,
        idAsignador: this.props.idAsignador,
        admin: this.props.admin  
      };
  }

  componentWillReceiveProps(nextProps) {
      this.setState({
        descripcion: nextProps.descripcion,
        puntosAsignados: nextProps.puntosAsignados,
        fechaCreacion: nextProps.fechaCreacion,
        idUsuario: nextProps.idUsuario,
        idAsignador: nextProps.idAsignador,
        admin: nextProps.admin  
      });
  }

 mostrarContenidoUsuario() {
    if (this.state.admin) {
      return (
      <li className="list-group-item">
        <div className="row">
          <div className="col-md-9 col-12">
            <p><b>Actividad: </b>{this.state.descripcion}</p>
            <p><b>Realizada por el usuario </b>{this.state.idUsuario}</p>
            <p><b>Puntos asignados: {this.state.puntosAsignados} </b>
              (el {this.state.fechaCreacion.substring(0, 10)} a las  {this.state.fechaCreacion.substring(11, 20)}
              &nbsp;por el administrador {this.state.idAsignador})
            </p>
          </div>
        </div>
      </li>
    );
    } else {
      return (
      <li className="list-group-item">
        <div className="row">
          <div className="col-md-9 col-12">
            <p><b>Actividad: </b>{this.state.descripcion}</p>
            <p>¡ Ganaste <b className="text-warning">{this.state.puntosAsignados}</b> puntos por esta actividad !</p>
          </div>
        </div>
      </li>
      );
    }
  }

  render() {
    return (
          <div>{this.mostrarContenidoUsuario()}</div>
    );
  }
}


export default Obtenido;
