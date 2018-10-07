import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import BeneficioRedimido from './BeneficioRedimido.jsx';
import { withTracker } from 'meteor/react-meteor-data';
import { Redimidos } from '../api/redimidos.js';
import { withRouter } from 'react-router';

class BeneficiosRedimidosAdmin extends Component {
  constructor(props) {
    super(props);
    this.usuarioFiltroInput = React.createRef();

    if (!localStorage.getItem('PTUusuario')) {
      this.props.history.push('/');
    }

    this.state = {
      token: localStorage.getItem('PTUusuario'),
      admin: false,
      filtroCodigo: false,
      usuario: null
    };
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
          this.props.history.push('/');
        }
      }
    });
  }

  renderRedimidos(estado) {
    let redimidos = this.props.redimidos;

    if (this.state.filtroCodigo) {
      redimidos = redimidos.filter(
        redimido => redimido.idUsuario === this.usuarioFiltroInput
      );
    }

    if (estado === 'Notificado') {
      redimidos = redimidos.filter(
        redimido => redimido.estado === 'Notificado'
      );
    } else if (estado === 'Cancelado') {
      redimidos = redimidos.filter(redimido => redimido.estado === 'Cancelado');
    } else if (estado === 'Contactado') {
      redimidos = redimidos.filter(
        redimido => redimido.estado === 'Contactado'
      );
    } else if (estado === 'En proceso') {
      redimidos = redimidos.filter(
        redimido => redimido.estado === 'En proceso'
      );
    } else if (estado === 'Disfrutado') {
      redimidos = redimidos.filter(
        redimido => redimido.estado === 'Disfrutado'
      );
    }

    return redimidos.map(redimido => (
      <BeneficioRedimido
        key={redimido._id}
        redimido={redimido}
        fechaRedimido={redimido.fechaRedimido}
        puntosRedimidos={redimido.puntosRedimidos}
        estado={redimido.estado}
        admin={this.state.admin}
        idUsuario={redimido.idUsuario}
        estado={redimido.estado}
        usuarioLogueado={this.state.usuario}
      />
    ));
  }

  render() {
    return (
      <div id="catalogoRedimidos" className="container-fluid">
        <div className="row">
          <div className="col-12">
            <ul className="nav nav-pills nav-fill" id="myTab" role="tablist">
              <li className="nav-item ">
                <a
                  className="nav-link black-buttons text-warning active"
                  id="tab-Notificados"
                  data-toggle="tab"
                  href="#notificados"
                  role="tab"
                  aria-controls="beneficios-redimidos"
                >
                  Notificados
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link black-buttons text-warning"
                  id="tab-Contactado"
                  data-toggle="tab"
                  href="#contactado"
                  role="tab"
                  aria-controls="puntos-ganados"
                >
                  Contactado
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link black-buttons text-warning"
                  id="tab-EnProceso"
                  data-toggle="tab"
                  href="#enProceso"
                  role="tab"
                  aria-controls="puntos-ganados"
                  aria-selected="false"
                >
                  En proceso
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link black-buttons text-warning"
                  id="tab-cancelado"
                  data-toggle="tab"
                  href="#cancelado"
                  role="tab"
                  aria-controls="puntos-ganados"
                  aria-selected="false"
                >
                  Cancelado
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link black-buttons text-warning"
                  id="tab-Disfrutado"
                  data-toggle="tab"
                  href="#disfrutado"
                  role="tab"
                  aria-controls="puntos-ganados"
                  aria-selected="false"
                >
                  Disfrutado
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="tab-content" id="myTabContent">
          <div
            className="tab-pane fade show active"
            id="notificados"
            role="tabpanel"
            aria-labelledby="beneficios-tab"
          >
            <ul className="list-group">{this.renderRedimidos('Notificado')}</ul>
          </div>
          <div
            className="tab-pane fade"
            id="contactado"
            role="tabpanel"
            aria-labelledby="puntos-tab"
          >
            <ul className="list-group">{this.renderRedimidos('Contactado')}</ul>
          </div>
          <div
            className="tab-pane fade"
            id="enProceso"
            role="tabpanel"
            aria-labelledby="puntos-tab"
          >
            <ul className="list-group">{this.renderRedimidos('En proceso')}</ul>
          </div>
          <div
            className="tab-pane fade"
            id="cancelado"
            role="tabpanel"
            aria-labelledby="puntos-tab"
          >
            <ul className="list-group">{this.renderRedimidos('Cancelado')}</ul>
          </div>
          <div
            className="tab-pane fade"
            id="disfrutado"
            role="tabpanel"
            aria-labelledby="puntos-tab"
          >
            <ul className="list-group">{this.renderRedimidos('Disfrutado')}</ul>
          </div>
        </div>
      </div>
    );
  }
}

BeneficiosRedimidosAdmin = withRouter(BeneficiosRedimidosAdmin);

export default withTracker(() => {
  Meteor.subscribe('redimidos', localStorage.getItem('PTUusuario'));
  return {
    redimidos: Redimidos.find({}, { sort: { fechaRedimido: -1 } }).fetch()
  };
})(BeneficiosRedimidosAdmin);
