import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import BeneficioRedimido from './BeneficioRedimido.jsx';
import { withTracker } from 'meteor/react-meteor-data';
import { Redimidos } from '../api/redimidos.js';

class BeneficiosRedimidos extends Component {
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

  renderRedimidos() {
    let Redimidos = this.props.redimidos;

    return Redimidos.map(redimido => (
      <BeneficioRedimido
        key={redimido._id}
        redimido={redimido}
        fechaRedimido={redimido.fechaRedimido}
        puntosRedimidos={redimido.puntosRedimidos}
        admin={this.state.admin}
        idUsuario={redimido.idUsuario}
        estado={redimido.estado}
      />
    ));
  }

  render() {
    return (
      <div id="catalogoRedimidos" className="row">
        <div className="col-12">
          <h3 className="text-center font-weight-bold text-uniandes">
            &nbsp;Beneficios Redimidos &nbsp;
          </h3>
          <br />
        </div>
        <div className="col-12">
          <ul className="list-group">{this.renderRedimidos()}</ul>
        </div>
      </div>
    );
  }
}

export default withTracker(() => {
  Meteor.subscribe('redimidos', localStorage.getItem('PTUusuario'));
  return {
    redimidos: Redimidos.find({}, { sort: { fechaRedimido: -1 } }).fetch()
  };
})(BeneficiosRedimidos);
