import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Obtenidos } from '../api/obtenidos.js';
import Obtenido from './Obtenido.jsx';

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
        console.log(res);
        if (res.rol === 'adminPTU') {
          console.log('Yes');
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
      <Obtenido
        key={obtenido._id}
        descripcion={obtenido.descripcion}
        puntosAsignados={obtenido.puntosAsignados}
        fechaCreacion={obtenido.fechaCreacion}
        idUsuario={obtenido.idUsuario}
        idAsignador={obtenido.idAsignador}
        admin={this.state.admin}
      />
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
          <hr />
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
    obtenidos: Obtenidos.find({}, { sort: { fechaCreacion: -1 } }).fetch()
  };
})(PuntosObtenidos);
