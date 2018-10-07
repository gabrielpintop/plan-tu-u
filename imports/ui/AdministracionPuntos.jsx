import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import BeneficiosRedimidos from './BeneficiosRedimidos.jsx';
import PObtenidos from './PObtenidos.jsx';
import ConseguirPuntos from './ConseguirPuntos.jsx'
import BeneficiosRedimidosAdmin from './BeneficiosRedimidos.jsx';


export default class AdministracionPuntos extends Component {
  constructor(props) {
    super(props);

    this.state = {
      verPuntos: false,
      token: localStorage.getItem('PTUusuario'),
      usuario: null,
      puntosUsuario: 0,
      nombreUsuario: '',
      correo: '',
      admin:false
    };
  }

  componentDidMount() {
    Meteor.call('usuarios.decodificar', this.state.token, (err, res) => {
      if (err) {
        alert(err.error);
      } else if (res) {
        if (res.rol === 'uniandino') {
          console.log('EL USUARIO VIENDO EL DETAIL ES', res);
          this.setState({
            verPuntos: true,
            usuario: res,
            puntosUsuario: res.puntos,
            nombreUsuario: res.nombre,
            correo: res.correo,
            redimidos: null
          });
        }
        else{
          this.setState({
            admin: true,
            nombreUsuario: res.nombre,
            usuario: res
          });
        }
      }
    });
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
              <h2><i className="fas fa-certificate"></i> Te quedan {this.state.puntosUsuario} puntos <i className="fas fa-certificate"></i></h2>
              </center>
            <br />
            </div>
            <ul className="nav nav-pills nav-fill" id="myTab" role="tablist">
              <li className="nav-item ">
               <a className="nav-link black-buttons text-warning" id="beneficios-redimidos" data-toggle="tab" href="#beneficiosRedimidos" role="tab" aria-controls="beneficios-redimidos" >Beneficios redimidos</a>
              </li>
              <li className="nav-item">
               <a className="nav-link black-buttons text-warning" id="puntos-ganados" data-toggle="tab" href="#puntosGanados" role="tab" aria-controls="puntos-ganados">Puntos ganados</a>
              </li>
              <li className="nav-item">
               <a className="nav-link black-buttons text-warning" id="puntos-ganados" data-toggle="tab" href="#info" role="tab" aria-controls="puntos-ganados" aria-selected="false">¿Cómo obtener puntos?</a>
              </li>
            </ul>
        </div>
       </div>
          <div className="tab-content" id="myTabContent">
              <div className="tab-pane fade show active" id="beneficiosRedimidos" role="tabpanel" aria-labelledby="beneficios-tab"><BeneficiosRedimidos/></div>
              <div className="tab-pane fade" id="puntosGanados" role="tabpanel" aria-labelledby="puntos-tab"><PObtenidos/></div>
              <div className="tab-pane fade" id="info" role="tabpanel" aria-labelledby="puntos-tab"><ConseguirPuntos/></div>
           </div>
      </div>
    );
  }
}