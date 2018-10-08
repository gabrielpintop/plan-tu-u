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
            Para obtener puntos debe realizar ciertas actividades o participar
            en eventos de la universidad. Nosotros clasificamos esas acciones en
            "Manifestación", "Interacción", "Apropiación", "Compromiso" y a
            partir de dichas categorías te asignamos unos puntos.
          </p>
          <p>
            <i className="fas fa-people-carry text-warning" />
            &nbsp;
            <b>Manifestación: </b> Actividades relacionadas con tu participación
            en voluntariados y redes de emprendedores.
          </p>
          <p>
            <i className="fas fa-user-circle text-warning" />
            &nbsp;
            <b>Interacción: </b> Actividades relacionadas con tu participación
            en la plataforma y regitro en los grupos de egresados de la
            universidad.
          </p>
          <p>
            <i className="fas fa-users text-warning" />
            &nbsp;
            <b>Compromiso: </b> Actividades relacionadas con donaciones y
            campañas.
          </p>
          <p>
            <i className="fas fa-layer-group text-warning" />
            &nbsp;
            <b>Apropiación: </b> Actividades que cuantifican tu actividad como
            egresado, por ejemplo qué tanto participas en el Programa de
            Egresados.
          </p>
          <center>
            Para más información de dichas actividades que te asignan puntos
            ingresa a
            <Link to={'/obtencionDePuntos'} style={{ textDecoration: 'none' }}>
              <b className="text-warning"> Catálogo de asignaciones </b>
            </Link>
          </center>
          <hr />
        </div>
      </div>
    );
  }
}

export default ConseguirPuntos;
