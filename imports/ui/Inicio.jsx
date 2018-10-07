import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import LoadingScreen from 'react-loading-screen';

export default class Inicio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      verPuntosUsuario: false,
      token: localStorage.getItem('PTUusuario'),
      admin: false,
      usuario: null,
      cargando: true
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
            usuario: res,
            cargando: false
          });
        } else {
          this.setState({
            usuario: res,
            cargando: false
          });
        }
      } else {
        this.setState({
          cargando: false
        });
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
    let opciones = [];

    if (this.state.admin) {
      opciones.push(
        <div className="col-md-6 col-12 text-center mt-5">
          <Link
            to={'/dashboardAdministrativo'}
            style={{ textDecoration: 'none' }}
          >
            <div className="s-300-px mx-auto text-center rounded-circle bg-uniandes d-flex">
              <img
                className="mt-2 mb-2 text-center mx-auto justify-content-center align-self-center pointer"
                src="./dashboardAdministrativoLogo.png"
                alt="Logo puntos"
                width="180px"
              />
            </div>
            <h5 className="mt-2 text-dark">Dashboard administrativo</h5>
          </Link>
        </div>
      );
      opciones.push(
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
      opciones.push(this.opcionBeneficios());
      opciones.push(
        <div className="col-md-6 col-12 text-center mt-5 mb-5">
          {this.opcionObtencionPuntos()}
        </div>
      );
    } else {
      opciones.push(this.opcionBeneficios());
      opciones.push(
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
      opciones.push(
        <div className="col-12 text-center mt-5 mb-5">
          {this.opcionObtencionPuntos()}
        </div>
      );
    }

    return opciones;
  }

  opcionBeneficios() {
    return (
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
    );
  }

  opcionObtencionPuntos() {
    return (
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
    );
  }

  render() {
    if (this.state.cargando) {
      return (
        <LoadingScreen
          loading={true}
          bgColor="#f1f1f1"
          spinnerColor="#9ee5f8"
          textColor="#676767"
          logoSrc="/favicon.png"
        >
          <div />
        </LoadingScreen>
      );
    } else {
      return (
        <div>
          <div className="container-fluid">
            <img
              src="banner2.jpg"
              className="img-fluid"
              alt="banner Plan Tu U"
            />
          </div>
          <div className="row">{this.mostrarOpciones()}</div>
        </div>
      );
    }
  }
}
