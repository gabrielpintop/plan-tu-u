import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';

class Beneficio extends Component {
  constructor(props) {
    super(props);

    this.state = {
      beneficio: this.props.beneficio,
      usuario: this.props.usuario,
      admin: this.props.admin,
      actualizar: false
    };

    this.toggleFormActualizarBeneficio = this.toggleFormActualizarBeneficio.bind(
      this
    );

    this.beneficioActualizarInput = React.createRef();
    this.puntosActualizarInput = React.createRef();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.admin) {
      this.setState({
        beneficio: nextProps.beneficio,
        usuario: nextProps.usuario,
        admin: true
      });
    } else {
      this.setState({
        beneficio: nextProps.beneficio,
        usuario: nextProps.usuario,
        admin: false
      });
    }
  }

  eliminarBeneficio() {
    let confirmar = confirm('¿Está seguro que desea borrar este beneficio?');
    if (confirmar) {
      Meteor.call(
        'beneficios.remover',
        this.state.beneficio._id,
        this.state.usuario
      );
    }
  }

  handleActualizarBeneficioSubmit(event) {
    event.preventDefault();
    const beneficio = this.beneficioActualizarInput.current.value;
    const puntos = Number(this.puntosActualizarInput.current.value);
    if (
      puntos === this.state.beneficio.puntosRequeridos &&
      beneficio === this.state.beneficio.beneficio
    ) {
      alert('El beneficio no ha sido modificado');
    } else {
      let beneficioN = {
        beneficio: beneficio,
        puntosRequeridos: Number(puntos)
      };

      Meteor.call(
        'beneficios.actualizar',
        this.state.beneficio._id,
        beneficioN,
        this.state.usuario,
        (err, res) => {
          if (err) {
            alert(err);
          } else {
            alert('El beneficio se actualizó correctamente.');
            this.toggleFormActualizarBeneficio();
          }
        }
      );
    }
  }

  toggleFormActualizarBeneficio() {
    this.setState({
      actualizar: !this.state.actualizar
    });
  }

  formActualizarBeneficio() {
    if (this.state.actualizar) {
      return (
        <div className="col-12">
          <hr />
          <h5>Actualizar beneficio</h5>
          <form onSubmit={this.handleActualizarBeneficioSubmit.bind(this)}>
            <div className="form-group">
              <label htmlFor={'actualizar' + this.state.beneficio._id}>
                Descripción del beneficio
              </label>

              <textarea
                id={'actualizar' + this.state.beneficio._id}
                className="form-control"
                rows="2"
                type="text"
                defaultValue={this.state.beneficio.beneficio}
                ref={this.beneficioActualizarInput}
                minLength="4"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor={'puntos' + this.state.beneficio._id}>
                Puntos requeridos
              </label>
              <input
                id={'puntos' + this.state.beneficio._id}
                className="form-control"
                type="number"
                defaultValue={this.state.beneficio.puntosRequeridos}
                ref={this.puntosActualizarInput}
                min="0"
                pattern="\d+"
                required
              />
            </div>
            <button type="submit" className="btn btn-outline-warning mr-1">
              <i className="far fa-edit" />
              &nbsp;Enviar
            </button>
            <button
              type="button"
              className="btn btn-danger ml-1"
              onClick={this.toggleFormActualizarBeneficio}
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

  mostrarDetallesPuntos() {
    let usuario = this.state.usuario;
    if (
      (!usuario && this.state.beneficio.puntosRequeridos > 0) ||
      (usuario &&
        !this.state.admin &&
        this.state.beneficio.puntosRequeridos > usuario.puntos)
    ) {
      return (
        <div
          className="col-lg-3 col-md-4 col-12 font-weight-bold text-right"
          onClick={() => this.notificarPuntosFaltantes()}
        >
          <button type="button" className="btn btn-outline-warning">
            Redimir - <b>{this.state.beneficio.puntosRequeridos}</b> puntos
          </button>
        </div>
      );
    } else if (usuario && this.state.admin) {
      return (
        <div className="col-lg-3 col-md-4 col-12 font-weight-bold text-right">
          <p>
            <b>Puntos:</b> {this.state.beneficio.puntosRequeridos}
          </p>
        </div>
      );
    } else if (
      usuario &&
      usuario.rol === 'uniandino' &&
      this.state.beneficio.puntosRequeridos > 0 &&
      this.state.beneficio.puntosRequeridos <= usuario.puntos
    ) {
      return (
        <div className="col-lg-3 col-md-4 col-12 font-weight-bold text-right">
          <button
            type="button"
            className="btn btn-uniandes"
            onClick={() => this.redimirBeneficio()}
          >
            Redimir - <b>{this.state.beneficio.puntosRequeridos}</b> puntos
          </button>
        </div>
      );
    }
  }

  notificarPuntosFaltantes() {
    if (this.state.usuario) {
      let puntosFaltantes =
        this.state.beneficio.puntosRequeridos - this.state.usuario.puntos;

      alert(
        'Te faltan ' +
          puntosFaltantes +
          ' puntos para poder redimir este beneficio.'
      );
    } else {
      alert('Debes iniciar sesión para redimir un beneficio.');
      document.getElementById('botonParaIniciarSesion').click();
    }
  }

  redimirBeneficio() {
    if (this.state.admin) {
      alert('Un administrador no puede redimir beneficios');
    } else if (!this.state.usuario) {
      alert('Debes iniciar sesión para redimir el beneficio');
    } else {
      const acepto = confirm(
        'Se restarán ' +
          this.state.beneficio.puntosRequeridos +
          ' puntos de tu cuenta. ¿Deseas continuar con la transacción?'
      );

      if (acepto) {
        Meteor.call(
          'redimidos.redimir',
          {
            idBeneficio: this.state.beneficio._id,
            idUsuario: this.state.usuario._id
          },
          (err, res) => {
            if (err) {
              alert(err.error);
            } else if (res) {
              alert('El beneficio fue redimido de forma exitosa.');
              window.location.reload();
            }
          }
        );
      }
    }
  }

  mostrarDetallesAdmin() {
    let admin = [];
    if (this.state.usuario && this.state.admin) {
      let beneficio = this.state.beneficio;

      admin.push(
        <div key="separadorInfoAdmin" className="col-12">
          <hr />
        </div>
      );

      admin.push(
        <div key="informacionBeneficioAdmin" className="col-md-6 col-12">
          <p>
            <b>Creado por: </b> {beneficio.nombreCreador} -{' '}
            {beneficio.idCreador}
            <br />
            <b>Fecha de creación: </b> {beneficio.fechaCreacion}
          </p>
        </div>
      );

      admin.push(
        <div
          key="botonesAdministracionAdmin"
          className="col-md-6 text-right col-12"
        >
          {this.botonEdicion()}
          <button
            type="button"
            className="btn btn-danger ml-1 mb-2"
            onClick={this.eliminarBeneficio.bind(this)}
          >
            <i className="fas fa-trash-alt" />
            &nbsp;Borrar beneficio
          </button>
        </div>
      );
    }
    return admin;
  }

  botonEdicion() {
    if (!this.state.actualizar) {
      return (
        <button
          type="button"
          className="btn btn-uniandes mr-1 mb-2"
          onClick={this.toggleFormActualizarBeneficio.bind(this)}
        >
          <i className="far fa-edit" />
          &nbsp;Editar beneficio
        </button>
      );
    }
  }

  render() {
    return (
      <li className="list-group-item">
        <div className="row">
          <div className="col-lg-9 col-md-8 col-12">
            <p>{this.state.beneficio.beneficio}</p>
          </div>
          {this.mostrarDetallesPuntos()}
          {this.formActualizarBeneficio()}
          {this.mostrarDetallesAdmin()}
        </div>
      </li>
    );
  }
}

export default Beneficio;
