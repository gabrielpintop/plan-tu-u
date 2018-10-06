import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import Asignacion from './Asignacion.jsx';
import { withTracker } from 'meteor/react-meteor-data';
import { Asignaciones } from '../api/asignaciones.js';

class CatalogoAsignaciones extends Component {
  constructor(props) {
    super(props);
    this.itemAsignacionInput = React.createRef();
    this.descripcionAsignacionInput = React.createRef();
    this.puntosAsignacionInput = React.createRef();

    this.state = {
      botonAgregarAsignacion: false,
      botonAsignar: false,
      formCrearAsignacion: false,
      formAsignar: false,
      token: localStorage.getItem('PTUusuario'),
      admin: false,
      usuario: null
    };

    this.toggleFormAgregarAsignaciones = this.toggleFormAgregarAsignaciones.bind(
      this
    );
  }

  componentDidMount() {
    Meteor.call('usuarios.decodificar', this.state.token, (err, res) => {
      if (err) {
        alert(err.error);
      } else if (res) {
        if (res.rol === 'adminPTU') {
          this.setState({
            botonAgregarAsignacion: true,
            botonAsignar: true,
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

  handleCrearAsignacionSubmit(event) {
    event.preventDefault();

    const item = this.itemAsignacionInput.current.value;
    const descripcion = this.descripcionAsignacionInput.current.value;
    const puntos = this.puntosAsignacionInput.current.value;

    Meteor.call(
      'asignaciones.insertar',
      item,
      descripcion,
      Number(puntos),
      this.state.usuario
    );

    this.itemAsignacionInput.current.value = '';
    this.this.descripcionAsignacionInput.current.value = '';
    this.puntosAsignacionInput.current.value = '';
    this.toggleFormAgregarAsignaciones();
  }

  renderAsignaciones() {
    let asignaciones = this.props.asignaciones;

    console.log(asignaciones);

    return asignaciones.map(asignacion => (
      //   <Asignacion
      //     key={asignacion._id}
      //     asignacion={beneficio}
      //     admin={this.state.admin}
      //     asignacionesAUsuario={this.vecesAsignadaUsuario(asignacion._id)}
      //   />
      <li>asignacion.descripcion</li>
    ));
  }

  vecesAsignadaUsuario(asignacion) {
    if (this.state.usuario && !this.state.admin) {
      let asignacionesUsuario = this.props.asignacionesUsuario;

      asignacionesUsuario = asignacionesUsuario.filter(
        asg => asg._id === asignacion
      );

      return asignacionesUsuario.length;
    } else {
      return -1;
    }
  }

  agregarAsignacion() {
    if (this.state.botonAgregarAsignacion) {
      return (
        <div className="text-center">
          <button
            type="button"
            className="btn btn-outline-warning"
            onClick={this.toggleFormAgregarAsignaciones}
          >
            <i className="fas fa-plus" />
            &nbsp;Agregar asignación
          </button>
          <hr />
        </div>
      );
    }
  }

  toggleFormAgregarAsignaciones() {
    this.setState({
      botonAgregarAsignacion: !this.state.botonAgregarAsignacion,
      formCrearAsignacion: !this.state.formCrearAsignacion
    });
  }

  formCrearAsignacion() {
    if (this.state.formCrearAsignacion) {
      return (
        <div className="col-12">
          <h5>Agregar una nueva asignación</h5>
          <form onSubmit={this.handleCrearAsignacionSubmit.bind(this)}>
            <div className="form-group">
              <label htmlFor="itemAsignacion">Puntos a asignar</label>
              <input
                id="itemAsignacion"
                className="form-control"
                type="text"
                ref={this.itemAsignacionInput}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="descripcionAsignacion">
                Descripción de la asignación
              </label>
              <textarea
                id="descripcionAsignacion"
                className="form-control"
                rows="2"
                type="text"
                ref={this.descripcionAsignacionInput}
                minLength="4"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="puntosDeAsignacion">Puntos a asignar</label>
              <input
                id="puntosDeAsignacion"
                className="form-control"
                type="number"
                ref={this.puntosAsignacionInput}
                min="0"
                pattern="\d+"
                required
              />
            </div>
            <button type="submit" className="btn btn-success mr-1">
              <i className="far fa-check-circle" />
              &nbsp;Crear asignación
            </button>
            <button
              type="button"
              className="btn btn-danger ml-1"
              onClick={this.toggleFormAgregarAsignaciones}
            >
              <i className="far fa-times-circle" />
              &nbsp;Cancelar
            </button>
          </form>
          <hr />
        </div>
      );
    }
  }

  render() {
    return (
      <div id="catalogoBeneficios" className="row">
        <div className="col-12">
          <div className="bg-uniandes text-light">
            <br />
            <h3 className="text-center font-weight-bold">
              &nbsp;Asignación de puntos&nbsp;
            </h3>
            <br />
          </div>
          <hr />
        </div>
        {this.formCrearAsignacion()}
        <div className="col-12 text-center">{this.agregarAsignacion()}</div>

        <div className="col-12">
          <div className="bg-gratuitos rounded-top">
            <br />
            <h4 className="text-center">
              <img
                className="mw-100 img-fluid"
                src="gratuito.png"
                width="60px"
                alt=""
              />
              &nbsp;Beneficios gratuitos&nbsp;
            </h4>
            <br />
          </div>
          <ul className="list-group">{this.renderAsignaciones()}</ul>
          <hr />
        </div>
      </div>
    );
  }
}

export default withTracker(() => {
  Meteor.subscribe('asignaciones');
  return {
    asignaciones: Asignaciones.find(
      {},
      { sort: { puntosAsignados: 1 } }
    ).fetch()
  };
})(CatalogoAsignaciones);
