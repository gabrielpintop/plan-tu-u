import React, { Component } from 'react';

class Footer extends Component {
  render() {
    return (
      <footer className="footer raleway f-18 text-white PTU-footer">
        <div className="container container-fluid PTU-footer">
          <div className="row">
            <div
              className="col-xl-2 col-lg-7 col-md-2 mt-4 col-12"
              id="uniandes"
            >
                <img
                  className="mw-200 img-fluid"
                  src='logoUniandesBlanco.png'
                  alt="logo uniandes"
                />
            </div>
            <div
              className="col-xl-5 col-lg-7 col-md-5 mt-4 col-12"
              id="info"
            >
              <p className="text-justify">
                 Uniandino Siempre - Universidad de los Andes
                 Calle 18A No D-33 Bloque E, Piso 2 | Bogotá - Colombia
                 Teléfono [571] 332 4017 | egresados@uniandes.edu.co
              </p>
                 
            </div>

            <div
              className="col-xl-5 col-lg-7 col-md-5 mt-4 col-12"
              id="desarrollado"
            >
              <p className="text-justify font-weight-bold text-warning">
                 Desarrollado por Gabriel Pinto & Vivian Gómez
                 Estudiantes de ingeniería de sistemas | Uniandes 2018
              </p>
            </div>

          </div>
        </div>
      </footer>
    );
  }
}
export default Footer;