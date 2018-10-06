import React, { Component } from 'react';


class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      identificacion: '',
      clave: '',
      error: []
    };

    this.verificar = props.verificar;

    this.handleChangeIdentificacion = this.handleChangeIdentificacion.bind(this);

    this.handleChangeClave = this.handleChangeClave.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    let errores = [];
    if (
      this.state.identificacion.length < 5 ||
      this.state.identificacion.length > 15
    ) {
      errores.push(
        <p>
          &bull;&nbsp;El nombre de usuario debe tener entre 3 y 15 carateres.
        </p>
      );
    }

    if (this.state.clave.length < 8 || this.state.clave.length > 35) {
      errores.push(
        <p>&bull;&nbsp;La contraseña debe tener entre 8 y 35 carateres.</p>
      );
    }

    if (errores.length === 0) {
          Meteor.call('usuarios.validarUsuario', Number(identificacion), clave);
    } else {
      this.setState({
        error: errores
      });
    }

    event.preventDefault();
  }

  mostrarError() {
    if (this.state.error.length > 0) {
      return (
        <div className="alert alert-danger letra-pequenia" role="alert">
          {this.state.error}
        </div>
      );
    }
  }

  handleChangeIdentificacion(event) {
    this.setState({ identificacion: event.target.value });
  }

  handleChangeClave(event) {
    this.setState({ clave: event.target.value });
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
                Bienvenido a Plan tú U!
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
              <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                  <label htmlFor="nombreDeUsuarioInput">
                    <b>Identificación</b>
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="nombreDeUsuarioInput"
                    value={this.state.value}
                    onChange={this.handleChangeIdentificacion}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="loginInputPassword">
                    <b>Contraseña</b>
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="loginInputPassword1"
                    value={this.state.value}
                    onChange={this.handleChangeClave}
                    autoComplete="password"
                    required
                  />
                </div>
                {this.mostrarError()}
                <center>
                  <button type="submit" className="btn btn-warning mr-1">
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
