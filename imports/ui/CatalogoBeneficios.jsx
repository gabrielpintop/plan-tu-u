import React, { Component } from 'react';
import Beneficio from './Beneficio.jsx';
import { withTracker } from 'meteor/react-meteor-data';
import { Beneficios } from '../api/beneficios.js';

class CatalogoBeneficios extends Component {
  constructor(props) {
    super(props);
    this.beneficioInput = React.createRef();
    this.puntosInput = React.createRef();

    this.state = {
      botonAgregarBeneficio: true,
      formCrearBeneficio: false
    };

    this.toggleFormAgregarBeneficios = this.toggleFormAgregarBeneficios.bind(
      this
    );
  }

  handleCrearBeneficioSubmit(event) {
    event.preventDefault();

    // Find the text field via the React ref
    const beneficio = this.beneficioInput.current.value;
    const puntos = this.puntosInput.current.value;

    Beneficios.insert({
      beneficio: beneficio,
      puntosRequeridos: puntos,
      createdAt: new Date() // current time
    });

    // Clear form
    this.beneficioInput.current.value = '';
    this.puntosInput.current.value = '';
    this.toggleFormAgregarBeneficios();
  }

  renderBeneficios() {
    return this.props.beneficios.map(beneficio => (
      <Beneficio key={beneficio._id} beneficio={beneficio} />
    ));
  }

  agregarBeneficio() {
    if (this.state.botonAgregarBeneficio) {
      return (
        <button
          type="button"
          className="btn btn-success"
          onClick={this.toggleFormAgregarBeneficios}
        >
          <i className="fas fa-plus" />
          &nbsp;Agregar beneficio
        </button>
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
        <div className="div">
          <hr />
          <h2>Agregar un nuevo beneficio</h2>
          <form onSubmit={this.handleCrearBeneficioSubmit.bind(this)}>
            <div className="form-group">
              <label htmlFor="descripcionBeneficio">
                Descripción del beneficio
              </label>

              <textarea
                id="descripcionBeneficio"
                className="form-control"
                rows="3"
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
                required
              />
            </div>
            <button type="submit" className="btn btn-primary mr-1">
              Crear beneficio
            </button>
            <button
              className="btn btn-danger ml-1"
              onClick={this.toggleFormAgregarBeneficios}
            >
              Cancelar
            </button>
          </form>
          <hr />
        </div>
      );
    }
  }

  render() {
    return (
      <div>
        {this.agregarBeneficio()}

        <div className="row">
          <div className="col-12">{this.formCrearBeneficio()}</div>
          <div className="col-12">
            <h2>Catálogo de Beneficios</h2>
          </div>
        </div>
        <ul>{this.renderBeneficios()}</ul>
      </div>
    );
  }
}

export default withTracker(() => {
  return {
    beneficios: Beneficios.find({}, { sort: { createdAt: -1 } }).fetch()
  };
})(CatalogoBeneficios);
