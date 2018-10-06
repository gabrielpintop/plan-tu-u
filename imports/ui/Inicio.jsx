import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

export default class Inicio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      verPuntosUsuario:false,
      token: localStorage.getItem('PTUusuario'),
      admin: false,
      usuario: null
    };
  }


  componentDidMount() {
    Meteor.call('usuarios.decodificar', this.state.token, (err, res) => {
      if (err) {
        alert(err.error);
      } else if (res) {
        console.log(res);
        if (res.rol === 'adminPTU') {
          console.log('Yes');
          this.setState({
            botonAgregarBeneficio: true,
            admin: true,
            usuario: res
          });
        } else {
          console.log("UNIANDINO ", res);
          this.setState({
            token: localStorage.getItem('PTUusuario'),
            usuario: res

          });
        }
      }
    });
  }


  verPuntosUsuario() {
    if (this.state.usuario) {
      console.log("Entra!");
      this.setState({
        verPuntosUsuario: !this.state.verPuntosUsuario,
      });
       document.getElementById('verPuntosUs').click()
    } else {
      alert("Por favor inicia sesión");
      document.getElementById('botonParaIniciarSesion').click();
      document.getElementById('verPuntosUs').click()
    }
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
            <div className="s-300-px mx-auto text-center rounded-circle bg-uniandes d-flex">
              <img
                className="mt-2 mb-2 text-center mx-auto justify-content-center align-self-center pointer"
                src="./puntosBlanco.png"
                alt="Logo puntos"
                width="180px"
                onClick={() => this.verPuntosUsuario()}
              />
            </div>
            <h5 className="mt-2 text-dark">Puntos</h5>
          
        </div>
      );
    }
  }

  render() {
    return (
      <div>
        <div className="container-fluid">
          <img src="banner2.jpg" className="img-fluid" alt="banner Plan Tu U" />
        </div>
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
      </div>
    );
  }
}
