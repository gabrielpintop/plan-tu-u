import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Inicio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      admin: false
    };
  }

  componentDidMount() {
    Meteor.call(
      'usuarios.decodificar',
      localStorage.getItem('PTUusuario'),
      (err, res) => {
        if (err) {
          alert(err.error);
        } else if (res && res.rol === 'adminPTU') {
          this.setState({
            admin: true
          });
        }
      }
    );
  }

  mostrarOpciones() {
    if (this.state.admin) {
      return (
        <div className="col-md-6 col-12 text-center mt-5">
          <Link to={'/puntos'} style={{ textDecoration: 'none' }}>
            <div className="s-300-px mx-auto text-center rounded-circle bg-uniandes d-flex">
              <img
                className="mt-2 mb-2 text-center mx-auto justify-content-center align-self-center pointer"
                src="./opcionesAdmin.png"
                alt="Logo puntos"
                width="180px"
              />
            </div>
            <h5 className="mt-2 text-dark">Administrar Puntos</h5>
          </Link>
        </div>
      );
    } else {
      return (
        <div className="col-md-6 col-12 text-center mt-5">
          <Link to={'/puntos'} style={{ textDecoration: 'none' }}>
            <div className="s-300-px mx-auto text-center rounded-circle bg-uniandes d-flex">
              <img
                className="mt-2 mb-2 text-center mx-auto justify-content-center align-self-center pointer"
                src="./puntosBlanco.png"
                alt="Logo puntos"
                width="180px"
              />
            </div>
            <h5 className="mt-2 text-dark">Puntos</h5>
          </Link>
        </div>
      );
    }
  }

  render() {
    return (
      <div className="row">
        <div className="col-md-6 col-12 text-center mt-5">
          <Link to={'/beneficios'} style={{ textDecoration: 'none' }}>
            <div className="s-300-px mx-auto text-center rounded-circle bg-uniandes d-flex">
              <img
                className="mt-2 mb-2 text-center mx-auto justify-content-center align-self-center pointer"
                src="./beneficiosBlanco.png"
                alt="Logo beneficios"
                width="180px"
              />
            </div>
            <h5 className="mt-2 text-dark">Beneficios</h5>
          </Link>
        </div>
        {this.mostrarOpciones()}
      </div>
    );
  }
}
