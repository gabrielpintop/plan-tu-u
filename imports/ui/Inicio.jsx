import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';

export default class Inicio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      verPuntosUsuario: false,
      token: localStorage.getItem('PTUusuario'),
      admin: false,
      usuario: null
    };
  }

  componentDidMount() {
    Meteor.call('usuarios.decodificar', this.state.token, (err, res) => {
      if (err) {
        alert(err.error);
      } else if (res) {
        if (res.rol === 'adminPTU') {
          this.setState({
            admin: true,
            usuario: res
          });
        } else {
          this.setState({
            usuario: res
          });
        }
      }
    });
  }

  verPuntosUsuario() {
    if (this.state.usuario) {
      this.setState({
        verPuntosUsuario: !this.state.verPuntosUsuario
      });
      document.getElementById('verPuntosUs').click();
    } else {
      alert('Debes iniciar sesión para ver tus puntos');
      document.getElementById('botonParaIniciarSesion').click();
    }
  }

  mostrarOpciones() {
    if (this.state.admin) {
      return (
        <div className="col-md-6 col-12 text-center mt-5">
            <div className="s-300-px mx-auto text-center rounded-circle bg-uniandes d-flex">
              <img
                className="mt-2 mb-2 text-center mx-auto justify-content-center align-self-center pointer"
                src="./redimidosLogoBlanco.png"
                alt="Logo puntos"
                width="180px"
                onClick={() => this.verPuntosUsuario()}
              />
            </div>
            <h5 className="mt-2 text-dark">Beneficios redimidos</h5>
        </div>
      );
    } else {
      return (
        <div className="col-md-6 col-12 text-center mt-5">
          <div className="s-300-px mx-auto text-center rounded-circle bg-uniandes d-flex">
            <img
              className="mt-2 mb-2 text-center mx-auto justify-content-center align-self-center pointer"
              src="./puntosBlanco.png"
              alt="Logo puntos"
              width="180px"
              onClick={() => this.verPuntosUsuario()}
            />
          </div>
          <h5 className="mt-2 text-dark">Puntos</h5>
        </div>
      );
    }
  }

  render() {
    return (
      <div>
        <div className="container-fluid">
          <img src="banner2.jpg" className="img-fluid" alt="banner Plan Tu U" />
        </div>
        <div className="row">
          <div className="col-md-6 col-12 text-center mt-5">
            <Link to={'/beneficios'} style={{ textDecoration: 'none' }}>
              <div className="s-300-px mx-auto text-center rounded-circle bg-uniandes d-flex">
                <img
                  className="mt-2 mb-2 text-center mx-auto justify-content-center align-self-center pointer"
                  src="./beneficiosBlanco.png"
                  alt="Logo beneficios"
                  width="180px"
                />
              </div>
              <h5 className="mt-2 text-dark">Beneficios</h5>
            </Link>
          </div>
          {this.mostrarOpciones()}
          <div className="col-12 text-center mt-5 mb-5">
            <Link to={'/obtencionDePuntos'} style={{ textDecoration: 'none' }}>
              <div className="s-300-px mx-auto text-center rounded-circle bg-uniandes d-flex">
                <img
                  className="mt-2 mb-2 text-center mx-auto justify-content-center align-self-center pointer"
                  src="./obtencionPuntos.png"
                  alt="Logo beneficios"
                  width="180px"
                />
              </div>
              <h5 className="mt-2 text-dark">Obtención de puntos</h5>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
