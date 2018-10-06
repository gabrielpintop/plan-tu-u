import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Usuarios } from '../api/usuarios.js';

class Registro extends Component {
  constructor(props) {
    super(props);

    this.state = {
      nombre: '',
      identificacion: '',
      correo: '',
      celular: '',
      clave: '',
      error: []
    };

    this.verificar = props.verificar;

    this.handleChangeNombre= this.handleChangeNombre.bind(this);

    this.handleChangeIdentificacion= this.handleChangeIdentificacion.bind(this);

    this.handleChangeCorreo= this.handleChangeCorreo.bind(this);

    this.handleChangeCelular= this.handleChangeCelular.bind(this);

    this.handleChangeClave = this.handleChangeClave.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    let errores = [];

    if (this.state.nombre.length < 10) {
      errores.push(
        <p>&bull;&nbsp;El nombre del usuario debe tener al menos 10 carateres.</p>
      );
    }

    if (this.state.identificacion < 0) {
      errores.push(
        <p>&bull;&nbsp;El código no puede ser un numero negativo.</p>
      );
    }

    if (
      this.state.identificacion.length < 5 ||
      this.state.identificacion.length > 15
    ) {
      errores.push(
        <p>
          &bull;&nbsp;El codigo del usuario debe tener entre 5 y 15 carateres + {this.state.identificacion.length}.
        </p>
      );
    }

    if (this.state.clave.length < 8 || this.state.clave.length > 30) {
      errores.push(
        <p>&bull;&nbsp;La contraseña debe tener entre 8 y 35 carateres.</p>
      );
    }

    if (errores.length === 0) {
    
    const nombre = this.state.nombre;
    const identificacion = this.state.identificacion;    
    const correo = this.state.correo;    
    const celular = this.state.celular;    
    const clave = this.state.clave;  

    Meteor.call('usuarios.insertar', nombre, Number(identificacion),correo,celular, clave);
    

    } else {
      this.setState({
        error: errores
      });
    }    
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

  handleChangeNombre(event) {
    this.setState({ nombre: event.target.value });
  }

  handleChangeIdentificacion(event) {
    this.setState({ identificacion: event.target.value });
  }

  handleChangeCorreo(event) {
    this.setState({ correo: event.target.value });
  }

  handleChangeCelular(event) {
    this.setState({ celular: event.target.value });
  }

  handleChangeClave(event) {
    this.setState({ clave: event.target.value });
  }

  render() {
    return (
        <div className="container-fluid">
         <div className="col-12">
          <hr/>
          <center>
          <h3>Bienvenido a Plan Tú U</h3>
          </center>
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
                  <label htmlFor="registroInputNombre">
                    <b>Nombre</b>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="registroInputNombre"
                    value={this.state.value}
                    onChange={this.handleChangeNombre}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="registroInputCorreo">
                    <b>Correo electrónico</b>
                  </label>
                  <input
                    type="mail"
                    className="form-control"
                    id="registroInputCorreo"
                    value={this.state.value}
                    onChange={this.handleChangeCorreo}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="registroInputUsuario">
                    <b>Celular</b>
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="registroInputCodigo"
                    value={this.state.value}
                    onChange={this.handleChangeCelular}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="registroInputCelular">
                    <b>Código de uniandino</b>
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="registroInputCelular"
                    value={this.state.value}
                    onChange={this.handleChangeIdentificacion}
                    required
                  />
                </div>     
                <div className="form-group">
                  <label htmlFor="exampleInputPassword1">
                    <b>Contraseña</b>
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="exampleInputPassword1"
                    value={this.state.value}
                    onChange={this.handleChangeClave}
                    autoComplete="foo"
                    required
                  />
                </div>
                {this.mostrarError()}
                <center>
                  <button type="submit" className="btn btn-warning mr-1">
                    ¡Empecemos!
                  </button>
                </center>
            </form>
          <hr />
        </div>
      </div>
    );
  }
}
export default Registro;
