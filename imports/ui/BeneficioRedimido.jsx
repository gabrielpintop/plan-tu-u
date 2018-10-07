import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';

class BeneficioRedimido extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redimido: this.props.redimido,
      fechaRedimido: this.props.fechaRedimido,
      puntosRedimidos: this.props.puntosRedimidos,
      admin: this.props.admin,
      idUsuario: this.props.idUsuario,
      estado: this.props.estado,
      usuario: null
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      redimido: nextProps.redimido,
      fechaRedimido: nextProps.fechaRedimido,
      puntosRedimidos: nextProps.puntosRedimidos,
      admin: nextProps.admin,
      idUsuario: nextProps.idUsuario,
      estado: nextProps.estado
    });
  }

  buscarContactoUsuario(idUsuario) {
    Meteor.call(
      'usuarios.buscarUsuario',
      { identificacion: idUsuario },
      (err, res) => {
        if (err) {
          alert(err.error);
        } else {
          this.setState({
            usuario: res
          });
        }
      }
    );
  }

  mostrarContactoUsuario() {
    if (!this.state.usuario && this.state.admin && this.state.idUsuario) {
      this.buscarContactoUsuario(this.state.idUsuario);
    } else if (this.state.usuario && this.state.admin) {
      return (
        <p>
          <b>Celular: </b>
          {this.state.usuario.celular}
          <br />
          <b>Correo: </b>
          {this.state.usuario.correo}
          &nbsp;
        </p>
      );
    }
  }

  mostrarContenidoUsuario() {
    if (!this.state.admin) {
      return (
        <li className="list-group-item">
          <div className="row">
            <div className="col-md-9 col-12">
              <p>
                <b>Beneficio: </b>
                {this.state.redimido.beneficio}
                <br />
                <b>Puntos gastados: </b>
                {this.state.puntosRedimidos}
                <br />
                <b>Estado: </b>
                {this.state.estado}
                <br />
                Redimido el {this.state.fechaRedimido.substring(0, 10)} a las{' '}
                {this.state.fechaRedimido.substring(11, 20)}
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
              <p>
                <b>Usuario: </b>
                &nbsp;
                {this.state.idUsuario}
              </p>
              <p>
                <b>Beneficio: </b>
                &nbsp;
                {this.state.redimido.beneficio}
              </p>
              <p>
                <b>Puntos gastados: </b>
                {this.state.puntosRedimidos}
              </p>
              <p>
                <b>Redimido el </b> {this.state.fechaRedimido.substring(0, 10)}{' '}
                a las {this.state.fechaRedimido.substring(11, 20)}
              </p>
              <b className="text-warning">Contacto: </b>
              {this.mostrarContactoUsuario()}
            </div>
          </div>
        </li>
      );
    }
  }

  render() {
    return <div>{this.mostrarContenidoUsuario()}</div>;
  }
}

export default BeneficioRedimido;
