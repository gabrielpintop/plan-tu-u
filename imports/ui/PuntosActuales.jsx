import React, { Component } from 'react';
import { Usuarios } from '../api/usuarios';
import { withTracker } from 'meteor/react-meteor-data';

class PuntosActuales extends Component {
  constructor(props) {
    super(props);
  }

  valor() {}

  render() {
    if (this.props.usuario) {
      return <span>{this.props.usuario.puntos}</span>;
    } else {
      return <span>0</span>;
    }
  }
}

export default withTracker(props => {
  Meteor.subscribe('usuarios.identificacion');
  return {
    usuario: Usuarios.findOne({ identificacion: props.idUsuario })
  };
})(PuntosActuales);
