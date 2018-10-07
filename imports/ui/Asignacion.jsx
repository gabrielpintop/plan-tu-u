import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';

class Asignacion extends Component {
  constructor(props) {
    super(props);

    this.state = {
      asignacion: this.props.asignacion,
      usuario: this.props.usuario,
      admin: this.props.admin,
      asignaciones: this.props.asignaciones,
      actualizar: false
    };

    this.toggleFormActualizarAsignacion = this.toggleFormActualizarAsignacion.bind(
      this
    );

    this.asignacionActualizarInput = React.createRef();
    this.puntosActualizarInput = React.createRef();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      asignacion: nextProps.asignacion,
      usuario: nextProps.usuario,
      admin: nextProps.admin,
      asignaciones: nextProps.asignaciones
    });
  }

  // Funciones Meteor

  eliminarAsignacion() {
    let confirmar = confirm('¿Está seguro que desea borrar esta asignación?');
    if (confirmar) {
      Meteor.call(
        'asignaciones.remover',
        {
          idAsignacion: this.state.asignacion.idAsignacion,
          usuario: this.state.usuario
        },
        (err, res) => {
          if (err) {
            alert(err);
          } else {
            alert(res);
          }
        }
      );
    }
  }

  // Manejadores de eventos

  handleActualizarAsignacionSubmit(event) {
    event.preventDefault();
    const asignacion = this.asignacionActualizarInput.current.value;
    const puntos = Number(this.puntosActualizarInput.current.value);
    if (
      puntos === this.state.asignacion.puntosRequeridos &&
      asignacion === this.state.asignacion.asignacion
    ) {
      alert('Los valores de la asignación no han cambiado');
    } else {
      let asignacionN = {
        descripcion: asignacion,
        puntosAsignados: Number(puntos)
      };

      Meteor.call(
        'asignaciones.actualizar',
        {
          idAsignacion: this.state.asignacion.idAsignacion,
          asignacionNueva: asignacionN,
          usuario: this.state.usuario
        },
        (err, res) => {
          if (err) {
            alert(err);
          } else {
            alert(res);
            this.toggleFormActualizarAsignacion();
          }
        }
      );
    }
  }

  // Toggles

  toggleFormActualizarAsignacion() {
    this.setState({
      actualizar: !this.state.actualizar
    });
  }

  // Forms

  formActualizarAsignacion() {
    if (this.state.actualizar) {
      return (
        <div className="col-12">
          <hr />
          <h5>Actualizar asignación</h5>
          <form onSubmit={this.handleActualizarAsignacionSubmit.bind(this)}>
            <div className="form-group">
              <label htmlFor={'actualizar' + this.state.asignacion._id}>
                Descripción de la asignación
              </label>

              <textarea
                id={'actualizar' + this.state.asignacion._id}
                className="form-control"
                rows="2"
                type="text"
                defaultValue={this.state.asignacion.descripcion}
                ref={this.asignacionActualizarInput}
                minLength="4"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor={'puntos' + this.state.asignacion._id}>
                Puntos requeridos
              </label>
              <input
                id={'puntos' + this.state.asignacion._id}
                className="form-control"
                type="number"
                defaultValue={this.state.asignacion.puntosAsignados}
                ref={this.puntosActualizarInput}
                min="0"
                pattern="\d+"
                required
              />
            </div>
            <button type="submit" className="btn btn-success mr-1">
              <i className="far fa-edit" />
              &nbsp;Editar asignación
            </button>
            <button
              type="button"
              className="btn btn-danger ml-1"
              onClick={this.toggleFormActualizarAsignacion}
            >
              <i className="far fa-times-circle" />
              &nbsp;Cancelar
            </button>
          </form>
        </div>
      );
    }
  }

  // Renders

  mostrarDetallesAsignacion() {
    if (this.state.admin) {
      return (
        <div className="col-lg-3 col-md-4 col-12 text-right">
          <p>
            <b>{this.state.asignacion.idAsignacion}</b>
            <br />
            <b>Puntos: </b>
            {this.state.asignacion.puntosAsignados}
          </p>
        </div>
      );
    } else if (this.state.usuario && !this.state.admin) {
      return (
        <div className="col-lg-3 col-md-4 col-12 text-right">
          <p>
            <b>Puntos: </b>
            {this.state.asignacion.puntosAsignados}
            <br />
            <b>Veces obtenida: </b>
            {this.state.asignaciones}
          </p>
        </div>
      );
    } else {
      return (
        <div className="col-lg-3 col-md-4 col-12 text-right">
          <p>
            <b>Puntos: </b>
            {this.state.asignacion.puntosAsignados}
          </p>
        </div>
      );
    }
  }

  mostrarDetallesAdmin() {
    let admin = [];
    if (this.state.usuario && this.state.admin) {
      console.log('Aca');
      let asignacion = this.state.asignacion;
      admin.push(
        <div className="col-12">
          <hr />
        </div>
      );
      admin.push(
        <div className="col-md-6 col-12">
          <p>
            <b>Creado por: </b> {asignacion.nombreCreador} -{' '}
            {asignacion.idCreador}
            <br />
            <b>Fecha de creación: </b> {asignacion.fechaCreacion}
          </p>
        </div>
      );

      admin.push(
        <div className="col-md-6 text-right col-12">
          <button
            type="button"
            className="btn btn-primary mr-1 mb-2"
            onClick={this.toggleFormActualizarAsignacion.bind(this)}
          >
            <i className="far fa-edit" />
            &nbsp;Editar asignacion
          </button>
          <button
            type="button"
            className="btn btn-danger ml-1 mb-2"
            onClick={this.eliminarAsignacion.bind(this)}
          >
            <i className="fas fa-trash-alt" />
            &nbsp;Borrar asignacion
          </button>
        </div>
      );
    }
    return admin;
  }

  render() {
    return (
      <li className="list-group-item">
        <div className="row">
          <div className="col-lg-9 col-md-8 col-12">
            <p>
              {this.state.asignacion.descripcion} <br />
              <b>Item: </b>
              {this.state.asignacion.item}
            </p>
          </div>
          {this.mostrarDetallesAsignacion()}
          {this.formActualizarAsignacion()}
          {this.mostrarDetallesAdmin()}
        </div>
      </li>
    );
  }
}

export default Asignacion;
