import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Usuarios } from '../api/usuarios.js';


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
      celular: '',
      correo: ''
    };
  }

   componentDidMount(){
      const me = this;
      Meteor.call(
        'usuarios.buscarUsuario', me.state.idUsuario, function(err, res) {
        if (err) {
          alert(err.error);
        } else {
          me.setState({
            celular: res.celular,
            correo: res.correo
          });
        }
      }
    );
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


  mostrarContactoUsuario(){
    return (
      <div>
        <b>Celular: </b><a href={"tel:"+this.state.celular}>{this.state.celular}&nbsp;</a>
        <address>
        <b>Correo: </b><a href={"mailto:"+this.state.correo}>{this.state.correo}</a>
        </address>
      </div>
    );
  }


  mostrarContenidoUsuario() {
    if (!this.state.admin) {
      return (
      <li className="list-group-item">
        <div className="row">
          <div className="col-md-9 col-12">
            <p><b>Beneficio: </b>&nbsp;{this.state.redimido.beneficio}</p>
            <p><b>Puntos gastados: </b>{this.state.puntosRedimidos}</p>
            <p><b>Estado: </b>{this.state.estado}</p>
            <p>Redimido el {this.state.fechaRedimido.substring(0, 10)} a las  {this.state.fechaRedimido.substring(11, 20)}</p>
          </div>
        </div>
      </li>
    );
    } else {
      return (
      <li className="list-group-item">
        <div className="row">
          <div className="col-md-9 col-12">
            <p><b>Usuario: </b>&nbsp;{this.state.idUsuario}</p>
            <p><b>Beneficio: </b>&nbsp;{this.state.redimido.beneficio}</p>
            <p><b>Puntos gastados: </b>{this.state.puntosRedimidos}</p>
            <p><b>Redimido el </b> {this.state.fechaRedimido.substring(0, 10)} a las  {this.state.fechaRedimido.substring(11,20)}</p>
            <b className="text-warning">Contacto: </b>{this.mostrarContactoUsuario()}
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

export default BeneficioRedimido;
