import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';

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
          // Encriptar la identificación y devolverla
          localStorage.setItem('PTUusuario', res.identificacion);
          window.location.reload();
        }
      }
    );
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
                  <label htmlFor="registroInputCorreo">
                    <b>Correo electrónico</b>
                  </label>
                  <input
                    type="mail"
                    className="form-control"
                    id="registroInputCorreo"
                    defaultValue="@uniandes.edu.co"
                    ref={this.correoInput}
                    minLength="4"
                    maxLength="35"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="registroInputClave">
                    <b>Contraseña</b>
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="registroInputClave"
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
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Login;
