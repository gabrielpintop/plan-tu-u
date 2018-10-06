import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { withRouter, Link } from 'react-router-dom';
import Login from './Login.jsx';
import UsuarioDetail from './UsuarioDetail.jsx';

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: localStorage.getItem('PTUusuario'),
      nombre: null
    };
  }

  componentDidMount() {
    Meteor.call('usuarios.decodificar', this.state.token, (err, res) => {
      if (err) {
        alert(err.error);
      } else if (res) {
        this.setState({
          nombre: res.nombre
        });
      }
    });
  }

  cerrarSesion() {
    localStorage.removeItem('PTUusuario');
    this.setState({
      token: null,
      nombre: null
    });
    window.location.reload();
  }

  renderOpcionesNavbar() {
    const lista = [];
    if (this.state.token) {
      return (
        <li className="nav-item dropdown pointer">
          <a
            className="nav-link dropdown-toggle"
            id="navbarDropdown"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            {this.state.nombre}
          </a>
          <div className="dropdown-menu" aria-labelledby="navbarDropdown">
            <a
              id="verPuntosUs"
              className="dropdown-item pointer"
              onClick={() => this.props.history.push('/puntos')}
            >
              Mis puntos
            </a>
            <a
              className="dropdown-item pointer"
              onClick={() => this.cerrarSesion()}
            >
              Cerrar sesión
            </a>
          </div>
        </li>
      );
    } else {
      lista.push(
        <li key="loginModalKey" className="nav-item navbar-right">
          <a
            id="botonParaIniciarSesion"
            className="nav-link pointer"
            data-toggle="modal"
            data-target="#loginModal"
          >
            Iniciar sesión
          </a>
        </li>
      );
      lista.push(
        <li className="nav-item">
          <a
            id="botonParaRegistrarse"
            className="nav-link pointer"
            onClick={() => this.props.history.push('/registro')}
          >
            Registrarse
          </a>
        </li>
      );
      return lista;
    }
  }

  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-md navbar-light bg-light py-md-2">
          <div className="container">
            <Link to={'/'} style={{ textDecoration: 'none' }}>
              <div className="navbar-brand">
                <img
                  src="/PTUUniandinoSiempre.png"
                  className="d-inline-block align-top"
                  alt="Plan Tú U Logo"
                  width="200px"
                  height="60px"
                />
              </div>
            </Link>
            <button
              className="navbar-toggler custom-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarNavDropdown"
              aria-controls="navbarNavDropdown"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>
            <div id="navbarNavDropdown" className="navbar-collapse collapse">
              <ul className="navbar-nav mx-auto" />
              <ul className="navbar-nav">{this.renderOpcionesNavbar()}</ul>
            </div>
          </div>
        </nav>
        <Login />
      </div>
    );
  }
}

export default withRouter(Navbar);
