import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Link } from 'react-router-dom';

class ConseguirPuntos extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="row">
        <div className="col-12">
          <div>
            <br />
             <h3 className="text-center font-weight-bold text-warning">
               &nbsp;¿Cómo obtener puntos?&nbsp;
             </h3>
            <br />
          </div>
          <hr />
        </div>
        <div className="col-12">
           <p>
           Para obtener puntos debe realizar ciertas actividades o participar en eventos de la universidad.
           Nosotros clasificamos esas acciones en "Manifestación", "Interacción" y "Compromiso" y a partir 
           de dichas categorías te asignamos unos puntos. 
           </p>
           <center>
           Para más información de dichas actividades que te asignan puntos ingresa a 
            <Link to={'/obtencionDePuntos'} style={{ textDecoration: 'none' }}>
                <a><b className="text-warning"> Catálogo de asignaciones </b></a>
            </Link>
           </center>
          <hr />
        </div>
      </div>
    );
  }
}

export default ConseguirPuntos;
