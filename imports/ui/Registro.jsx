import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { withRouter } from 'react-router-dom';

class Registro extends Component {
  constructor(props) {
    super(props);

    if (localStorage.getItem('PTUusuario')) {
      this.props.history.push('/');
    }

    this.nombreInput = React.createRef();

    this.identificacionInput = React.createRef();

    this.correoInput = React.createRef();

    this.celularInput = React.createRef();

    this.claveInput = React.createRef();
  }

  handleSubmit(event) {
    event.preventDefault();

    let correo = this.correoInput.current.value;
    let clave = this.claveInput.current.value;

    Meteor.call(
      'usuarios.insertar',
      {
        nombre: this.nombreInput.current.value,
        identificacion: this.identificacionInput.current.value,
        correo: correo,
        celular: this.celularInput.current.value,
        clave: clave
      },
      (err, res) => {
        if (err) {
          alert(err.error);
        } else if (res) {
          Meteor.call(
            'usuarios.validarUsuario',
            { correo, clave },
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
      }
    );
  }

  render() {
    return (
      <div className="row">
        <div className="col-12 mt-3 no-gutters">
          <div className="bg-uniandes text-light">
            <br />
            <h3 className="text-center font-weight-bold">
              &nbsp;Bienvenido a Plan Tú U&nbsp;
            </h3>
            <div className="container">
              <h5 className="text-center">
                Te invitamos a que llenes los siguientes datos para poder hacer
                uso de los servicios de la plataforma. <br /> La Universidad de
                los Andes no compartirá tu información personal con entidades
                externas o ajenas.
              </h5>
            </div>
            <br />
          </div>
          <hr />
        </div>
        <div className="col-12">
          <form onSubmit={this.handleSubmit.bind(this)}>
            <div className="form-group">
              <label htmlFor="registroInputNombre">
                <b>Nombre</b>
              </label>
              <input
                type="text"
                className="form-control"
                id="registroInputNombre"
                ref={this.nombreInput}
                minLength="4"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="registroInputCelular">
                <b>Celular</b>
              </label>
              <input
                type="number"
                className="form-control"
                id="registroInputCelular"
                ref={this.celularInput}
                min="0"
                minLength="5"
                maxLength="20"
                pattern="\d+"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="registroInputIdentificacion">
                <b>
                  Número de identificación (código uniandes en caso de tenerlo)
                </b>
              </label>
              <input
                type="number"
                className="form-control"
                id="registroInputIdentificacion"
                ref={this.identificacionInput}
                min="0"
                minLength="5"
                maxLength="15"
                pattern="\d+"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="registroInputCorreo">
                <b>
                  Correo electrónico (preferiblemente el correo institucional)
                </b>
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
              <button type="submit" className="btn btn-uniandes mr-1">
                ¡Empecemos!
              </button>
            </center>
          </form>
        </div>
      </div>
    );
  }
}
export default withRouter(Registro);
