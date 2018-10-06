import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import Beneficio from './Beneficio.jsx';
import { withTracker } from 'meteor/react-meteor-data';
import { Beneficios } from '../api/beneficios.js';

class CatalogoBeneficios extends Component {
  constructor(props) {
    super(props);
    this.beneficioInput = React.createRef();
    this.puntosInput = React.createRef();

    this.state = {
      botonAgregarBeneficio: false,
      formCrearBeneficio: false,
      usuario: localStorage.getItem('PTUusuario')
    };

    this.verificarPermisos();

    this.toggleFormAgregarBeneficios = this.toggleFormAgregarBeneficios.bind(
      this
    );
  }

  verificarPermisos() {
    if (this.state.usuario && this.state.usuario.rol === 'adminPTU') {
      this.setState({
        botonAgregarBeneficio: true
      });
    }
  }

  handleCrearBeneficioSubmit(event) {
    event.preventDefault();

    const beneficio = this.beneficioInput.current.value;
    const puntos = this.puntosInput.current.value;

    Meteor.call(
      'beneficios.insertar',
      beneficio,
      Number(puntos),
      this.state.usuario
    );

    this.beneficioInput.current.value = '';
    this.puntosInput.current.value = '';
    this.toggleFormAgregarBeneficios();
  }

  renderBeneficios(min, max) {
    let beneficios = this.props.beneficios;

    if (max !== -1 && min != -1) {
      beneficios = beneficios.filter(
        beneficio =>
          beneficio.puntosRequeridos > min && beneficio.puntosRequeridos < max
      );
    } else if (max !== -1) {
      beneficios = beneficios.filter(
        beneficio => beneficio.puntosRequeridos < max
      );
    } else if (min !== -1) {
      beneficios = beneficios.filter(
        beneficio => beneficio.puntosRequeridos > min
      );
    }

    return beneficios.map(beneficio => (
      <Beneficio key={beneficio._id} beneficio={beneficio} />
    ));
  }

  agregarBeneficio() {
    if (this.state.botonAgregarBeneficio) {
      return (
        <div className="text-center">
          <hr />
          <button
            type="button"
            className="btn btn-outline-warning"
            onClick={this.toggleFormAgregarBeneficios}
          >
            <i className="fas fa-plus" />
            &nbsp;Agregar beneficio
          </button>
          <hr />
        </div>
      );
    }
  }

  toggleFormAgregarBeneficios() {
    this.setState({
      botonAgregarBeneficio: !this.state.botonAgregarBeneficio,
      formCrearBeneficio: !this.state.formCrearBeneficio
    });
  }

  formCrearBeneficio() {
    if (this.state.formCrearBeneficio) {
      return (
        <div className="col-12">
          <hr />
          <h5>Agregar un nuevo beneficio</h5>
          <form onSubmit={this.handleCrearBeneficioSubmit.bind(this)}>
            <div className="form-group">
              <label htmlFor="descripcionBeneficio">
                Descripción del beneficio
              </label>

              <textarea
                id="descripcionBeneficio"
                className="form-control"
                rows="2"
                type="text"
                ref={this.beneficioInput}
                minLength="4"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="puntosDelBeneficio">Puntos requeridos</label>
              <input
                id="puntosDelBeneficio"
                className="form-control"
                type="number"
                ref={this.puntosInput}
                min="0"
                pattern="\d+"
                required
              />
            </div>
            <button type="submit" className="btn btn-success mr-1">
              <i className="far fa-check-circle" />
              &nbsp;Crear beneficio
            </button>
            <button
              type="button"
              className="btn btn-danger ml-1"
              onClick={this.toggleFormAgregarBeneficios}
            >
              <i className="far fa-times-circle" />
              &nbsp;Cancelar
            </button>
          </form>
          <hr />
        </div>
      );
    }
  }

  render() {
    return (
      <div id="catalogoBeneficios" className="row">
        <div className="col-12 no-gutters">
          <div className="bg-uniandes text-light">
            <br />
            <h3 className="text-center font-weight-bold">
              &nbsp;Catálogo de Beneficios&nbsp;
            </h3>
            <br />
          </div>
        </div>
        <div className="col-12">
          {this.agregarBeneficio()}
          {this.formCrearBeneficio()}
        </div>

        <div className="col-12">
          <div className="bg-uniandes text-light rounded-top">
            <br />
            <h4 className="text-center">&nbsp;Beneficios gratuitos&nbsp;</h4>
            <br />
          </div>
          <ul className="list-group">{this.renderBeneficios(-1, 1)}</ul>
          <hr />
        </div>

        <div className="col-12">
          <div className="bg-bronce text-light rounded-top">
            <br />
            <h4 className="text-center">
              &nbsp;Beneficios bronce (1 - 100)&nbsp;
            </h4>
            <br />
          </div>
          <ul className="list-group">{this.renderBeneficios(0, 101)}</ul>
          <hr />
        </div>

        <div className="col-12">
          <div className="bg-plata text-light rounded-top">
            <br />
            <h4 className="text-center">
              &nbsp;Beneficios plata (101 - 500)&nbsp;
            </h4>
            <br />
          </div>
          <ul className="list-group">{this.renderBeneficios(100, 501)}</ul>
          <hr />
        </div>

        <div className="col-12">
          <div className="bg-oro text-light rounded-top">
            <br />
            <h4 className="text-center">&nbsp;Beneficios oro (+500)&nbsp;</h4>
            <br />
          </div>
          <ul className="list-group">{this.renderBeneficios(500, -1)}</ul>
          <hr />
        </div>
      </div>
    );
  }
}

export default withTracker(() => {
  return {
    beneficios: Beneficios.find({}, { sort: { createdAt: -1 } }).fetch()
  };
})(CatalogoBeneficios);
