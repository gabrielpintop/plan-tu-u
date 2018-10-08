import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Asignaciones } from '../api/asignaciones.js';
import { Removidos } from '../api/removidos';
import PuntosObtenidos from './PuntosObtenidos.jsx';
import Punto from './Punto.jsx';
import { withRouter } from 'react-router';

class DashboardAdministrativo extends Component {
  constructor(props) {
    super(props);

    if (!localStorage.getItem('PTUusuario')) {
      this.props.history.push('/');
    }

    this.state = {
      admin: false,
      token: localStorage.getItem('PTUusuario'),
      botonAsignar: true,
      botonRemoverAsignacion: true,
      formAsignar: false,
      formRemoverAsignacion: false,
      usuario: null
    };

    this.usuarioAsignarInput = React.createRef();
    this.idAsignacionInput = React.createRef();

    this.usuarioDesasignarInput = React.createRef();
    this.idAsignacionRemoverInput = React.createRef();

    this.toggleFormAsignarPuntos = this.toggleFormAsignarPuntos.bind(this);

    this.toggleFormRemoverPuntos = this.toggleFormRemoverPuntos.bind(this);
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
          this.props.history.push('/puntos');
        }
      }
    });
  }

  // Manejo de los eventos

  handleRemoverPuntos(event) {
    event.preventDefault();

    let confirmar = confirm(
      '¿Estás seguro que deseas removerle está asignación al usuario ' +
        this.usuarioDesasignarInput.current.value +
        '?'
    );
    if (confirmar) {
      Meteor.call(
        'removidos.remover',
        {
          idUsuario: this.usuarioDesasignarInput.current.value,
          idAsignacion: this.idAsignacionRemoverInput.current.value,
          usuarioAsignador: this.state.usuario
        },
        (err, res) => {
          if (err) {
            alert(err.error);
          } else {
            this.usuarioDesasignarInput.current.value = '';
            this.idAsignacionRemoverInput.current.value = '';
            this.toggleFormRemoverPuntos();
            alert(res);
          }
        }
      );
    }
  }

  handleAsignarPuntos(event) {
    event.preventDefault();

    Meteor.call(
      'obtenidos.insertar',
      {
        idUsuario: this.usuarioAsignarInput.current.value,
        idAsignacion: this.idAsignacionInput.current.value,
        usuarioAsignador: this.state.usuario
      },
      (err, res) => {
        if (err) {
          alert(err.error);
        } else {
          alert(res);
        }
      }
    );

    this.usuarioAsignarInput.current.value = '';
    this.idAsignacionInput.current.value = '';
    this.toggleFormAsignarPuntos();
  }

  // Toggles

  toggleFormAsignarPuntos() {
    if (this.state.formRemoverAsignacion) {
      this.setState({
        botonAsignar: !this.state.botonAsignar,
        formAsignar: !this.state.formAsignar,
        formRemoverAsignacion: false,
        botonRemoverAsignacion: true
      });
    } else {
      this.setState({
        botonAsignar: !this.state.botonAsignar,
        formAsignar: !this.state.formAsignar
      });
    }
  }

  toggleFormRemoverPuntos() {
    if (this.state.formAsignar) {
      this.setState({
        botonRemoverAsignacion: !this.state.botonRemoverAsignacion,
        formRemoverAsignacion: !this.state.formRemoverAsignacion,
        formAsignar: false,
        botonAsignar: true
      });
    } else {
      this.setState({
        botonRemoverAsignacion: !this.state.botonRemoverAsignacion,
        formRemoverAsignacion: !this.state.formRemoverAsignacion
      });
    }
  }

  // Forms

  formAsignarPuntos() {
    if (this.state.formAsignar) {
      return (
        <div className="col-12">
          <h5>Asignar puntos a un usuario</h5>
          <form onSubmit={this.handleAsignarPuntos.bind(this)}>
            <div className="form-group">
              <label htmlFor="usarioAsignar">Identificación del usuario</label>
              <input
                id="usarioAsignar"
                className="form-control"
                type="number"
                ref={this.usuarioAsignarInput}
                min="0"
                minLength="5"
                maxLength="15"
                pattern="\d+"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="idAsignacionInput">Asignación de puntos</label>
              <select className="form-control" ref={this.idAsignacionInput}>
                {this.mapOpcionesAsignacion()}
              </select>
            </div>
            <button type="submit" className="btn btn-uniandes mr-1">
              <i className="far fa-check-circle" />
              &nbsp;Asignar puntos
            </button>
            <button
              type="button"
              className="btn btn-danger ml-1"
              onClick={this.toggleFormAsignarPuntos}
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

  formRemoverAsignacion() {
    if (this.state.formRemoverAsignacion) {
      return (
        <div className="col-12">
          <h5>Remover puntos a un usuario</h5>
          <form onSubmit={this.handleRemoverPuntos.bind(this)}>
            <div className="form-group">
              <label htmlFor="usuarioDesasignar">
                Identificación del usuario
              </label>
              <input
                id="usuarioDesasignar"
                className="form-control"
                type="number"
                ref={this.usuarioDesasignarInput}
                min="0"
                minLength="5"
                maxLength="15"
                pattern="\d+"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="desasignacionInput">Asignación de puntos</label>
              <select
                id="desasignacionInput"
                className="form-control"
                ref={this.idAsignacionRemoverInput}
              >
                {this.mapOpcionesAsignacion()}
              </select>
            </div>
            <button type="submit" className="btn btn-uniandes mr-1">
              <i className="fas fa-eraser" />
              &nbsp;Desasignar puntos
            </button>
            <button
              type="button"
              className="btn btn-danger ml-1"
              onClick={this.toggleFormRemoverPuntos}
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

  mapOpcionesAsignacion() {
    let asignaciones = this.props.asignaciones;

    return asignaciones.map(asignacion => (
      <option key={asignacion.idAsignacion} value={asignacion.idAsignacion}>
        {asignacion.idAsignacion} - {asignacion.puntosAsignados}
      </option>
    ));
  }

  // Renders

  renderRemovidos() {
    let removidos = this.props.removidos;

    return removidos.map(removido => (
      <Punto key={removido._id} punto={removido} admin={this.state.admin} />
    ));
  }

  botonesAdmin() {
    let botones = [];

    if (this.state.botonAsignar) {
      botones.push(
        <button
          key="botonAsignarPuntos"
          type="button"
          className="btn btn-outline-warning mr-2 mb-2"
          onClick={this.toggleFormAsignarPuntos}
        >
          <i className="fas fa-award" />
          &nbsp;Asignar puntos
        </button>
      );
    }

    if (this.state.botonRemoverAsignacion) {
      botones.push(
        <button
          key="botonRemoverPuntos"
          type="button"
          className="btn btn-outline-warning mr-2 mb-2"
          onClick={this.toggleFormRemoverPuntos}
        >
          <i className="fas fa-user-minus" />
          &nbsp;Remover puntos
        </button>
      );
    }

    botones.push(<hr key="separadorBotones" />);

    return botones;
  }

  render() {
    return (
      <div className="row">
        <div className="col-12">
          <div className="bg-uniandes text-light">
            <br />
            <h3 className="text-center font-weight-bold">
              &nbsp;Dashboard administrativo&nbsp;
            </h3>
            <br />
          </div>
          <hr />
        </div>
        <div className="col-12 text-center">{this.botonesAdmin()}</div>
        {this.formAsignarPuntos()}
        {this.formRemoverAsignacion()}
        <div className="col-12">
          <ul className="nav nav-pills nav-fill" id="myTab" role="tablist">
            <li className="nav-item ">
              <a
                className="nav-link black-buttons text-warning active"
                id="puntosAsignados"
                data-toggle="tab"
                href="#puntosAsignadosContenido"
                role="tab"
                aria-controls="puntosAsignados"
              >
                Puntos asignados
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link black-buttons text-warning"
                id="puntosRemovidos"
                data-toggle="tab"
                href="#puntosRemovidosContenido"
                role="tab"
                aria-controls="puntosRemovidos"
              >
                Puntos removidos
              </a>
            </li>
          </ul>
        </div>
        <div className="col-12">
          <div className="tab-content" id="myTabContent">
            <div
              className="tab-pane fade show active"
              id="puntosAsignadosContenido"
              role="tabpanel"
              aria-labelledby="beneficios-tab"
            >
              <hr />
              <PuntosObtenidos />
            </div>
            <div
              className="tab-pane fade"
              id="puntosRemovidosContenido"
              role="tabpanel"
              aria-labelledby="puntos-tab"
            >
              <hr />
              <h3 className="text-center font-weight-bold text-uniandes">
                &nbsp;Puntos removidos a los egresados &nbsp;
              </h3>
              <br />
              <ul className="list-group">{this.renderRemovidos()}</ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

DashboardAdministrativo = withRouter(DashboardAdministrativo);

export default withTracker(() => {
  let token = localStorage.getItem('PTUusuario');

  Meteor.subscribe('asignaciones', token);
  Meteor.subscribe('removidos', token);

  return {
    asignaciones: Asignaciones.find({}, { sort: { idAsignacion: 1 } }).fetch(),
    removidos: Removidos.find({}, { sort: { fecha: -1 } }).fetch()
  };
})(DashboardAdministrativo);
