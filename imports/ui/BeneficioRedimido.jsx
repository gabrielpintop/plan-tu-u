import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Usuarios } from '../api/usuarios.js';

class BeneficioRedimido extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redimido: this.props.redimido,
      fechaRedimido: this.props.fechaRedimido,
      puntosRedimidos: this.props.puntosRedimidos,
      estado: this.props.estado,
      admin: this.props.admin,
      idUsuario: this.props.idUsuario,
      usuario: null,
      usuarioLogueado: this.props.usuarioLogueado,
      actualizar: false
    };

    this.toggleFormActualizarBeneficio = this.toggleFormActualizarBeneficio.bind(
      this
    );
    this.actualizarEstadoInput = React.createRef();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      redimido: nextProps.redimido,
      fechaRedimido: nextProps.fechaRedimido,
      puntosRedimidos: nextProps.puntosRedimidos,
      estado: nextProps.estado,
      admin: nextProps.admin,
      idUsuario: nextProps.idUsuario,
      usuarioLogueado: nextProps.usuarioLogueado,
      estado: nextProps.estado
    });
  }

  handleActualizarBeneficioSubmit(event) {
    event.preventDefault();
    const estado = this.actualizarEstadoInput.current.value;
    if (estado === this.state.redimido.estado) {
      alert('Probel');
    } else {
      Meteor.call(
        'redimidos.actualizarEstado',
        this.state.redimido._id,
        estado,
        this.state.usuarioLogueado,
        (err, res) => {
          if (err) {
            alert(err);
          } else {
            // success!
          }
        }
      );

      this.toggleFormActualizarBeneficio();
    }
  }

  toggleFormActualizarBeneficio() {
    this.setState({
      actualizar: !this.state.actualizar
    });
  }

  formActualizarBeneficioRedimido() {
    if (this.state.actualizar) {
      return (
        <div className="col-12">
          <hr />
          <h5>Actualizar estado beneficio redimido</h5>
          <form onSubmit={this.handleActualizarBeneficioSubmit.bind(this)}>
            <div className="form-group">
              <label htmlFor={'puntos' + this.state.redimido._id}>
                Nuevo estado
              </label>
              <select
                id={'puntos' + this.state.redimido._id}
                className="form-control"
                defaultValue={this.state.redimido.estado}
                ref={this.actualizarEstadoInput}
                required
              >
                <option value="Notificado">Notificado</option>
                <option value="Contactado">Contactado</option>
                <option value="En proceso">En proceso</option>
                <option value="Cancelado">Cancelado</option>
                <option value="Disfrutado">Disfrutado</option>
              </select>
            </div>
            <button type="submit" className="btn btn-outline-warning">
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
        </div>
      );
    }
  }

  buscarContactoUsuario(idUsuario) {
    Meteor.call(
      'usuarios.buscarUsuario',
      { identificacion: idUsuario },
      (err, res) => {
        if (err) {
          alert(err.error);
        } else {
          this.setState({
            usuario: res
          });
        }
      }
    );
  }

  mostrarContactoUsuario() {
    if (!this.state.usuario && this.state.admin && this.state.idUsuario) {
      this.buscarContactoUsuario(this.state.idUsuario);
    } else if (this.state.usuario && this.state.admin) {
      return (
        <p>
          <b>Celular: </b>
          <a href={'tel:' + this.state.usuario.celular}>
            {this.state.usuario.celular}
            &nbsp;
          </a>
          <address>
            <b>Correo: </b>
            <a href={'mailto:' + this.state.usuario.correo}>
              {this.state.usuario.correo}
            </a>
          </address>
        </p>
      );
    }
  }

  mostrarContenidoUsuario() {
    if (!this.state.admin) {
      return (
        <li className="list-group-item">
          <div className="row">
            <div className="col-md-9 col-12">
              <p>
                <b>Beneficio: </b>
                {this.state.redimido.beneficio}
                <br />
                <b>Puntos gastados: </b>
                {this.state.puntosRedimidos}
                <br />
                <b>Estado: </b>
                {this.state.estado}
                <br />
                Redimido el {this.state.fechaRedimido.substring(0, 10)} a las{' '}
                {this.state.fechaRedimido.substring(10, 20)}
              </p>
            </div>
          </div>
        </li>
      );
    } else {
      return (
        <li className="list-group-item">
          <div className="row">
            <div className="col-md-9 col-12">
              <p>
                <b>Usuario: </b>
                &nbsp;
                {this.state.idUsuario}
              </p>
              <p>
                <b>Beneficio: </b>
                &nbsp;
                {this.state.redimido.beneficio}
              </p>
              <p>
                <b>Puntos gastados: </b>
                {this.state.puntosRedimidos}
              </p>
              <p>
                <b>Estado </b> {this.state.estado}
              </p>
              <p>
                <b>Redimido el </b> {this.state.fechaRedimido.substring(0, 10)}{' '}
                a las {this.state.fechaRedimido.substring(10, 20)}
              </p>
              <b className="text-warning">Contacto: </b>
              {this.mostrarContactoUsuario()}
            </div>
            {this.mostrarEditarEstado()}
            <br />
            {this.formActualizarBeneficioRedimido()}
          </div>
        </li>
      );
    }
  }

  mostrarEditarEstado() {
    let admin = [];
    if (this.state.admin) {
      admin.push(
        <div className="col-md-3 col-12 bg-red text-right">
          <button
            type="button"
            className="btn btn-uniandes"
            onClick={this.toggleFormActualizarBeneficio.bind(this)}
          >
            <i className="far fa-edit" />
            &nbsp;Cambiar estado
          </button>
        </div>
      );
    }
    return admin;
  }

  render() {
    return this.mostrarContenidoUsuario();
  }
}

export default BeneficioRedimido;
