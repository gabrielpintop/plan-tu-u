import React, { Component } from 'react';

class Footer extends Component {
  render() {
    return (
      <footer className="footer raleway f-18 text-white PTU-footer">
        <div className="container container-fluid PTU-footer">
          <div className="row">
            <div className="col-lg-2 col-md-6 mt-4 col-12" id="uniandes">
              <img
                className="mw-180 img-fluid"
                src="logoUniandesBlanco.png"
                alt="logo uniandes"
              />
            </div>
            <div className="col-lg-5 col-md-6 mt-4 col-12" id="info">
              <p className="text-justify">
                Uniandino Siempre - Universidad de los Andes
                <br />
                Calle 18A No D-33 Bloque E, Piso 2 | Bogotá - Colombia <br />
                Teléfono [571] 332 4017 | egresados@uniandes.edu.co
              </p>
            </div>

            <div className="col-lg-5 col-md-12 mt-4 col-12" id="desarrollado">
              <p className="text-justify font-weight-bold text-warning">
                Desarrollado por Gabriel Pinto & Vivian Gómez
              </p>
            </div>
            <div className="col-12 text-center copyright-opacity">
              © 2018 - PlanTúU. Todos los derechos reservados.
              <br />
              <br />
            </div>
          </div>
        </div>
      </footer>
    );
  }
}
export default Footer;
