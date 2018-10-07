import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import Asignacion from './Asignacion.jsx';
import { withTracker } from 'meteor/react-meteor-data';
import { Asignaciones } from '../api/asignaciones.js';
import { Obtenidos } from '../api/obtenidos';

class CatalogoAsignaciones extends Component {
  constructor(props) {
    super(props);
    this.itemAsignacionInput = React.createRef();
    this.descripcionAsignacionInput = React.createRef();
    this.puntosAsignacionInput = React.createRef();

    this.state = {
      token: localStorage.getItem('PTUusuario'),
      botonAgregarAsignacion: false,
      formCrearAsignacion: false,
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

  // Manejo de los eventos

  handleCrearAsignacionSubmit(event) {
    event.preventDefault();
    let item = this.itemAsignacionInput.current.value;

    Meteor.call('asignaciones.insertar', {
      item: item,
      descripcion: this.descripcionAsignacionInput.current.value,
      idAsignacion: 'A_' + (this.props.asignaciones.length + 1) + '_' + item,
      puntos: Number(this.puntosAsignacionInput.current.value),
      usuario: this.state.usuario
    });

    this.itemAsignacionInput.current.value = '';
    this.descripcionAsignacionInput.current.value = '';
    this.puntosAsignacionInput.current.value = '';
    this.toggleFormAgregarAsignaciones();
  }

  // Toggles

  toggleFormAgregarAsignaciones() {
    this.setState({
      botonAgregarAsignacion: !this.state.botonAgregarAsignacion,
      formCrearAsignacion: !this.state.formCrearAsignacion
    });
  }

  // Forms

  formCrearAsignacion() {
    if (this.state.formCrearAsignacion) {
      return (
        <div className="col-12">
          <h5>Agregar una nueva asignación</h5>
          <form onSubmit={this.handleCrearAsignacionSubmit.bind(this)}>
            <div className="form-group">
              <label htmlFor="itemAsignacion">Item de la asignación</label>
              <select
                id="itemAsignacion"
                className="form-control"
                ref={this.itemAsignacionInput}
              >
                <option key="Apropiación" value="Apropiación">
                  Apropiación
                </option>
                <option key="Compromiso" value="Compromiso">
                  Compromiso
                </option>
                <option key="Interaccion" value="Interacción">
                  Interacción
                </option>
                <option key="Manifestación" value="Manifestación">
                  Manifestación
                </option>
              </select>
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

  // Funciones extra

  vecesAsignadaUsuario(asignacion) {
    if (this.state.usuario && !this.state.admin && this.props.obtenidos) {
      let asignacionesUsuario = this.props.obtenidos;

      asignacionesUsuario = asignacionesUsuario.filter(
        asg => asg.idAsignacion === asignacion
      );

      return asignacionesUsuario.length;
    } else {
      return -1;
    }
  }

  // Renders

  renderAsignaciones() {
    let asignaciones = this.props.asignaciones;
    return asignaciones.map(asignacion => (
      <Asignacion
        key={asignacion._id}
        usuario={this.state.usuario}
        asignacion={asignacion}
        admin={this.state.admin}
        asignaciones={this.vecesAsignadaUsuario(asignacion.idAsignacion)}
      />
    ));
  }

  botonesAdmin() {
    let botones = [];

    if (this.state.botonAgregarAsignacion) {
      botones.push(
        <button
          key="botonAgregarAsignacion"
          type="button"
          className="btn btn-outline-warning mr-2 mb-2"
          onClick={this.toggleFormAgregarAsignaciones}
        >
          <i className="fas fa-plus" />
          &nbsp;Agregar asignación
        </button>
      );
      botones.push(<hr key="separadorBotones" />);
    }

    return botones;
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
        <div className="col-12 text-center">{this.botonesAdmin()}</div>
        {this.formCrearAsignacion()}

        <div className="col-12">
          <ul className="list-group">{this.renderAsignaciones()}</ul>
        </div>
      </div>
    );
  }
}

export default withTracker(() => {
  let token = localStorage.getItem('PTUusuario');

  Meteor.subscribe('asignaciones', token);
  Meteor.subscribe('obtenidos', token);

  return {
    asignaciones: Asignaciones.find(
      {},
      { sort: { puntosAsignados: 1 } }
    ).fetch(),
    obtenidos: Obtenidos.find({}, { sort: { fechaAsignado: 1 } }).fetch()
  };
})(CatalogoAsignaciones);
