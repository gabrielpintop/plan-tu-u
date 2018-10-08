import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { withRouter } from 'react-router-dom';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      identificacion: '',
      clave: '',
      error: []
    };

    this.correoInput = React.createRef();

    this.claveInput = React.createRef();
  }

  handleSubmit(event) {
    event.preventDefault();

    Meteor.call(
      'usuarios.validarUsuario',
      {
        correo: this.correoInput.current.value,
        clave: this.claveInput.current.value
      },
      (err, res) => {
        if (err) {
          alert(err.error);
        } else {
          localStorage.setItem('PTUusuario', res);
          window.location.reload();
        }
      }
    );
  }

  irARegistro() {
    document.getElementById('botonParaIniciarSesion').click();
    this.props.history.push('/registro');
  }

  render() {
    return (
      <div
        className="modal fade"
        id="loginModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div
          className="modal-dialog modal-dialog-centered modal-sm"
          role="document"
        >
          <div className="modal-content">
            <div className="modal-header bg-dark text-light">
              <h5 className="modal-title" id="exampleModalLabel">
                ¡Bienvenido de vuelta!
              </h5>
              <button
                type="button"
                id="cerrarLoginModal"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span className="text-light" aria-hidden="true">
                  &times;
                </span>
              </button>
            </div>
            <div className="modal-body">
              <form onSubmit={this.handleSubmit.bind(this)}>
                <div className="form-group">
                  <label htmlFor="loginInputCorreo">
                    <b>Correo electrónico</b>
                  </label>
                  <input
                    type="mail"
                    className="form-control"
                    id="loginInputCorreo"
                    ref={this.correoInput}
                    minLength="4"
                    maxLength="35"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="loginInputClave">
                    <b>Contraseña</b>
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="loginInputClave"
                    ref={this.claveInput}
                    minLength="8"
                    maxLength="35"
                    autoComplete="foo"
                    required
                  />
                </div>
                <center>
                  <button type="submit" className="btn btn-uniandes">
                    Iniciar sesión
                  </button>
                </center>
                <br />
              </form>
              <p className="text-center">
                ¿No tienes cuenta en Plan Tú U?
                <br />
                <span
                  className="text-uniandes font-weight-bold pointer"
                  onClick={this.irARegistro.bind(this)}
                >
                  Registrate
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default withRouter(Login);
