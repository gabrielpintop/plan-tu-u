import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Obtenidos } from '../api/obtenidos.js';
import Punto from './Punto.jsx';

class PuntosObtenidos extends Component {
  constructor(props) {
    super(props);

    this.state = {
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
        if (res.rol === 'adminPTU') {
          this.setState({
            admin: true,
            usuario: res
          });
        } else {
          this.setState({
            usuario: res
          });
        }
      }
    });
  }

  renderObtenidos() {
    let obtenidos = this.props.obtenidos;

    return obtenidos.map(obtenido => (
      <Punto key={obtenido._id} punto={obtenido} admin={this.state.admin} />
    ));
  }

  mostrarContenidoUsuario() {
    if (!this.state.admin) {
      return (
        <h3 className="text-center font-weight-bold text-uniandes">
          &nbsp;Ganaste puntos por: &nbsp;
        </h3>
      );
    } else {
      return (
        <h3 className="text-center font-weight-bold text-uniandes">
          &nbsp;Puntos obtenidos por los egresados &nbsp;
        </h3>
      );
    }
  }

  render() {
    return (
      <div id="catalogoObtenidos" className="row">
        <div className="col-12">
          {this.mostrarContenidoUsuario()}
          <br />
        </div>
        <div className="col-12">
          <ul className="list-group">{this.renderObtenidos()}</ul>
        </div>
      </div>
    );
  }
}

export default withTracker(() => {
  Meteor.subscribe('obtenidos', localStorage.getItem('PTUusuario'));
  return {
    obtenidos: Obtenidos.find({}, { sort: { fecha: -1 } }).fetch()
  };
})(PuntosObtenidos);
