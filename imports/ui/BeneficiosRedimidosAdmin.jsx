import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import BeneficioRedimido from './BeneficioRedimido.jsx';
import { withTracker } from 'meteor/react-meteor-data';
import { Redimidos } from '../api/redimidos.js';

class BeneficiosRedimidosAdmin extends Component {
  constructor(props) {
    super(props);
    this.usuarioFiltroInput = React.createRef();

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
          this.setState({
            usuario: res
          });
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
    <div>
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
    </div>
    ));
  }

  render() {
    return (
      <div id="catalogoRedimidos" className="container-fluid">
      <hr/>
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
                  Contactados
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
                  id="tab-Disfrutado"
                  data-toggle="tab"
                  href="#disfrutado"
                  role="tab"
                  aria-controls="puntos-ganados"
                  aria-selected="false"
                >
                  Disfrutados
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
          <div>
             <br />
              <h3 className="text-center font-weight-bold text-warning">
                &nbsp;Notificado &nbsp;
              </h3>
             <br />
          </div>
            <ul className="list-group">{this.renderRedimidos('Notificado')}</ul>
          </div>
          <div
            className="tab-pane fade"
            id="contactado"
            role="tabpanel"
            aria-labelledby="puntos-tab"
          >
          <div>
             <br />
              <h3 className="text-center font-weight-bold text-warning">
                &nbsp;Contactado &nbsp;
              </h3>
             <br />
          </div>            
          <ul className="list-group">{this.renderRedimidos('Contactado')}</ul>
          </div>
          <div
            className="tab-pane fade"
            id="enProceso"
            role="tabpanel"
            aria-labelledby="puntos-tab"
          >
          <div>
             <br />
              <h3 className="text-center font-weight-bold text-warning">
                &nbsp;En proceso &nbsp;
              </h3>
             <br />
          </div>

            <ul className="list-group">{this.renderRedimidos('En proceso')}</ul>
          </div>

          <div
            className="tab-pane fade"
            id="disfrutado"
            role="tabpanel"
            aria-labelledby="puntos-tab"
          >
          <div>
             <br />
              <h3 className="text-center font-weight-bold text-warning">
                &nbsp;Disfrutado &nbsp;
              </h3>
             <br />
          </div>

            <ul className="list-group">{this.renderRedimidos('Disfrutado')}</ul>
          </div>
        </div>
      </div>
    );
  }
}

export default withTracker(() => {
  Meteor.subscribe('redimidos', localStorage.getItem('PTUusuario'));
  return {
    redimidos: Redimidos.find({}, { sort: { fechaRedimido: -1 } }).fetch()
  };
})(BeneficiosRedimidosAdmin);
