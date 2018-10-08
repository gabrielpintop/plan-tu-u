import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import BeneficiosRedimidos from './BeneficiosRedimidos.jsx';
import PuntosObtenidos from './PuntosObtenidos.jsx';
import ConseguirPuntos from './ConseguirPuntos.jsx';
import { withRouter } from 'react-router';
import PuntosActuales from './PuntosActuales';

class AdministracionPuntos extends Component {
  constructor(props) {
    super(props);

    if (!localStorage.getItem('PTUusuario')) {
      this.props.history.push('/');
    }

    this.state = {
      verPuntos: false,
      token: localStorage.getItem('PTUusuario'),
      usuario: null,
      puntosUsuario: 0,
      nombreUsuario: '',
      correo: '',
      admin: false
    };
  }

  componentDidMount() {
    Meteor.call('usuarios.decodificar', this.state.token, (err, res) => {
      if (err) {
        alert(err.error);
      } else if (res) {
        if (res.rol === 'uniandino') {
          this.setState({
            verPuntos: true,
            usuario: res,
            identificacion: res.identificacion,
            puntosUsuario: res.puntos,
            nombreUsuario: res.nombre,
            correo: res.correo,
            redimidos: null
          });
        } else {
          this.props.history.push('/beneficiosRedimidos');
        }
      }
    });
  }

  puntosActuales() {
    if (this.state.identificacion) {
      return <PuntosActuales idUsuario={this.state.identificacion} />;
    }
  }

  render() {
    return (
      <div id="catalogoBeneficios" className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div className="bg-uniandes text-light">
              <br />
              <h1 className="text-center font-weight-bold">
                &nbsp;Bienvenido {this.state.nombreUsuario}
                &nbsp;
              </h1>
              <center>
                <h3>
                  <i className="fas fa-certificate" /> Te quedan puntos{' '}
                  {this.puntosActuales()} puntos
                  <i className="fas fa-certificate" />
                </h3>
              </center>
              <br />
            </div>
            <hr />
          </div>
          <div className="col-12">
            <ul className="nav nav-pills nav-fill" id="myTab" role="tablist">
              <li className="nav-item ">
                <a
                  className="nav-link black-buttons text-warning active"
                  id="beneficios-redimidos"
                  data-toggle="tab"
                  href="#beneficiosRedimidos"
                  role="tab"
                  aria-controls="beneficios-redimidos"
                >
                  Beneficios redimidos
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link black-buttons text-warning"
                  id="puntos-ganados"
                  data-toggle="tab"
                  href="#puntosGanados"
                  role="tab"
                  aria-controls="puntos-ganados"
                >
                  Puntos ganados
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link black-buttons text-warning"
                  id="puntos-ganados"
                  data-toggle="tab"
                  href="#info"
                  role="tab"
                  aria-controls="puntos-ganados"
                  aria-selected="false"
                >
                  ¿Cómo obtener puntos?
                </a>
              </li>
            </ul>
            <hr />
          </div>
          <div className="col-12">
            <div className="tab-content" id="myTabContent">
              <div
                className="tab-pane fade show active"
                id="beneficiosRedimidos"
                role="tabpanel"
                aria-labelledby="beneficios-tab"
              >
                <BeneficiosRedimidos />
              </div>
              <div
                className="tab-pane fade"
                id="puntosGanados"
                role="tabpanel"
                aria-labelledby="puntos-tab"
              >
                <PuntosObtenidos />
              </div>
              <div
                className="tab-pane fade"
                id="info"
                role="tabpanel"
                aria-labelledby="puntos-tab"
              >
                <ConseguirPuntos />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(AdministracionPuntos);
