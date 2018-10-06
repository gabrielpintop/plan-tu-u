import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Redimidos } from '../api/redimidos.js';
import Redimido from './Redimido.jsx';

export default class UsuarioDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      verPuntos: false,
      token: localStorage.getItem('PTUusuario'),
      usuario: null,
      puntosUsuario: 0,
      nombreUsuario: '',
      correo: ''
    };
  }

  componentDidMount() {
    Meteor.call('usuarios.decodificar', this.state.token, (err, res) => {
      if (err) {
        alert(err.error);
      } else if (res) {
        if (res.rol === 'uniandino') {
          console.log('EL USUARIO VIENDO EL DETAIL ES', res);
          this.setState({
            verPuntos: true,
            usuario: res,
            puntosUsuario: res.puntos,
            nombreUsuario: res.nombre,
            correo: res.correo,
            redimidos: null
          });
        }
      }
    });
  }

  renderUsuario() {
    Meteor.call(
      'usuarios.buscarUsuario',
      {
        correo: this.state.correo
      },
      (err, res) => {
        if (err) {
          alert(err.error);
        } else {
          this.setState({
            puntosUsuario: res.puntos
          });
        }
      }
    );
  }

  renderRedimidos() {
    Meteor.call(
      'redimidos.redimidosPublication',
      {
        token: this.state.token
      },
      (err, res) => {
        if (err) {
          alert(err.error);
        } else {
          this.setState({
            redimidos: res
          });
        }
      }
    );

    return redimidos.map(beneficio => (
      <Redimido key={redimido._id} redimido={redimido} />
    ));
  }

  render() {
    return (
      <div id="catalogoBeneficios" className="row">
        <div className="col-12">
          <div className="bg-uniandes text-light">
            <br />
            <h3 className="text-center font-weight-bold">
              &nbsp;Bienvenido {this.state.nombreUsuario}
              &nbsp;
            </h3>
            <br />
          </div>
          En esta sección puedes administrar tus puntos, ver cuantos tienes y
          cómo los has utilizado.
          <br />
          <h4> Tienes {this.state.puntosUsuario} puntos</h4>
          <hr />
          <div className="container-fluid">Tus puntos redimidos:</div>
        </div>
      </div>
    );
  }
}
