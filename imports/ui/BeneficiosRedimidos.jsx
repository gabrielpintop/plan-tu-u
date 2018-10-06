import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import Beneficio from './Beneficio.jsx';
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

  
  renderRedimidos() {
    let Redimidos = this.props.redimidos;

    return Redimidos.map(beneficio => (
      <BeneficiosRedimido
        key={beneficio._id}
        redimido={beneficio}
      />
    ));
  }

  render() {
    return (
      <div id="catalogoRedimidos" className="row">
        <div className="col-12">
          <div className="bg-uniandes text-light">
            <br />
            <h3 className="text-center font-weight-bold">
              &nbsp;Beneficios Redimidos &nbsp;
            </h3>
            <br />
          </div>
          <hr />
        </div>
        <div className="col-12">
          <ul className="list-group">{this.renderRedimidos()}</ul>
          <hr />
        </div>
      </div>
    );
  }
}

export default withTracker(() => {
  Meteor.subscribe('redimidos', this.state.token);
  return {
    redimidos: Redimidos.find({}, { sort: { puntosRequeridos: 1 } }).fetch()
  };
})(BeneficiosRedimidos);
