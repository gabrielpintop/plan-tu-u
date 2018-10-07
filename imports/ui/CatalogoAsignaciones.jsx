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

    this.usuarioAsignarInput = React.createRef();
    this.idAsignacionInput = React.createRef();

    this.usuarioDesasignarInput = React.createRef();
    this.idAsignacionRemoverInput = React.createRef();

    this.state = {
      token: localStorage.getItem('PTUusuario'),
      botonAgregarAsignacion: false,
      botonAsignar: false,
      botonRemoverAsignacion: false,
      formCrearAsignacion: false,
      formAsignar: false,
      formRemoverAsignacion: false,
      admin: false,
      usuario: null
    };

    this.toggleFormAgregarAsignaciones = this.toggleFormAgregarAsignaciones.bind(
      this
    );

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
            botonAgregarAsignacion: true,
            botonAsignar: true,
            botonRemoverAsignacion: true,
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

  toggleFormAgregarAsignaciones() {
    this.setState({
      botonAgregarAsignacion: !this.state.botonAgregarAsignacion,
      formCrearAsignacion: !this.state.formCrearAsignacion
    });
  }

  toggleFormAsignarPuntos() {
    this.setState({
      botonAsignar: !this.state.botonAsignar,
      formAsignar: !this.state.formAsignar
    });
  }

  toggleFormRemoverPuntos() {
    this.setState({
      botonRemoverAsignacion: !this.state.botonRemoverAsignacion,
      formRemoverAsignacion: !this.state.formRemoverAsignacion
    });
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
            <button type="submit" className="btn btn-success mr-1">
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
            <button type="submit" className="btn btn-success mr-1">
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

  mapOpcionesAsignacion() {
    let asignaciones = this.props.asignaciones;

    return asignaciones.map(asignacion => (
      <option key={asignacion.idAsignacion} value={asignacion.idAsignacion}>
        {asignacion.idAsignacion} - {asignacion.puntosAsignados}
      </option>
    ));
  }

  // Renders

  renderAsignaciones() {
    let asignaciones = this.props.asignaciones;
    return asignaciones.map(asignacion => (
      //   <Asignacion
      //     key={asignacion._id}
      //     asignacion={beneficio}
      //     admin={this.state.admin}
      //     asignacionesAUsuario={this.vecesAsignadaUsuario(asignacion.idAsignacion)}
      //   />
      <li className="list-group-item" key={asignacion._id}>
        {/* {this.vecesAsignadaUsuario(asignacion.idAsignacion)} -{' '} */}
        {asignacion.descripcion} - {asignacion.puntosAsignados}
      </li>
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
    }

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

    if (this.state.botonAgregarAsignacion || this.state.botonAsignar) {
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
        {this.formAsignarPuntos()}
        {this.formRemoverAsignacion()}

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