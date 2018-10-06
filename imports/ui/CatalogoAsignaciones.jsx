import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import Beneficio from './Beneficio.jsx';
import { withTracker } from 'meteor/react-meteor-data';
import { Beneficios } from '../api/beneficios.js';

class CatalogoAsignaciones extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <div />;
  }
}

export default CatalogoAsignaciones;
