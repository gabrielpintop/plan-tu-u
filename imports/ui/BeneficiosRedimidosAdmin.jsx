import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import BeneficioRedimido from './BeneficioRedimido.jsx';
import { withTracker } from 'meteor/react-meteor-data';
import { Redimidos } from '../api/redimidos.js';

class BeneficiosRedimidosAdmin extends Component {
  constructor(props) {
    super(props);
    this.usuarioDesasignarInput = React.createRef();

    this.state = {
      token: localStorage.getItem('PTUusuario'),
      admin: false,
      filtroCodigo:false,
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
    let redimidos = this.props.redimidos;

    if(this.state.filtroCodigo){
      redimidos = redimidos.filter(
        redimido =>
           redimido.idUsuario ===  this.usuarioDesasignarInput
      );
    }
    else{
    return redimidos.map(redimido => (
      <BeneficioRedimido
        key={redimido._id}
        redimido={redimido}
        fechaRedimido= {redimido.fechaRedimido}
        puntosRedimidos= {redimido.puntosRedimidos}
        estado={redimido.estado}
        admin={this.state.admin}
        idUsuario={redimido.idUsuario}
        estado={redimido.estado}
        usuarioLogueado={this.state.usuario}
      />
      ));
    }
  }


  render() {
    return (
      <div id="catalogoRedimidos" className="row">
        <div className="col-12">
          <ul className="list-group">{this.renderRedimidos()}</ul>
          <hr />
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
})(BeneficiosRedimidosAdmin);
