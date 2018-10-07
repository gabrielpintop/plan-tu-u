import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Asignaciones } from '../api/asignaciones.js';
import { Obtenidos } from '../api/obtenidos';
import { Removidos } from '../api/removidos';
import PObtenidos from './PObtenidos.jsx';

class Dashboard extends Component {
  constructor(props) {
    super(props);

    if (!localStorage.getItem('PTUusuario')) {
      this.props.history.push('/');
    }
  }

  render() {
    console.log(this.props.asignaciones);
    console.log(this.props.removidos);
    console.log(this.props.obtenidos);
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
              <PObtenidos />
            </div>
            <div
              className="tab-pane fade"
              id="puntosRemovidosContenido"
              role="tabpanel"
              aria-labelledby="puntos-tab"
            >
              <h2>2</h2>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withTracker(() => {
  let token = localStorage.getItem('PTUusuario');

  Meteor.subscribe('asignaciones', token);
  Meteor.subscribe('removidos', token);

  return {
    asignaciones: Asignaciones.find({}, { sort: { fechaAsignado: 1 } }).fetch(),
    removidos: Removidos.find({}, { sort: { fechaRemovido: 1 } }).fetch()
  };
})(Dashboard);
