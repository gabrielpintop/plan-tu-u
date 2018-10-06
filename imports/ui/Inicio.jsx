import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Inicio extends Component {
  render() {
    return (
        <div>
        <div className="container-fluid">
            <img src="banner2.jpg" class="img-fluid" alt="banner Plan Tu U"/>
        </div>      
        <div className="row">
        <div className="col-md-6 col-12 text-center mt-5">
          <Link to={'/beneficios'} style={{ textDecoration: 'none' }}>
            <div className="s-300-px mx-auto text-center rounded-circle bg-uniandes d-flex">
              <img
                className="mt-2 mb-2 text-center mx-auto justify-content-center align-self-center pointer"
                src="./beneficiosBlanco.png"
                alt=""
                width="180px"
              />
            </div>
            <h5 className="mt-2 text-dark">Beneficios</h5>
          </Link>
        </div>
        <div className="col-md-6 col-12 text-center mt-5">
          <Link to={'/puntos'} style={{ textDecoration: 'none' }}>
            <div className="s-300-px mx-auto text-center rounded-circle bg-uniandes d-flex">
              <img
                className="mt-2 mb-2 text-center mx-auto justify-content-center align-self-center pointer"
                src="./puntosBlanco.png"
                alt=""
                width="180px"
              />
            </div>
            <h5 className="mt-2 text-dark">Puntos</h5>
          </Link>
        </div>
       </div>
      </div>
    );
  }
}
