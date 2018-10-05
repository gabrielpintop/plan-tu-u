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

    let usuario = {
      codigo: 201515275,
      rol: 'adminPTU'
    };

    Meteor.call('beneficios.insertar', beneficio, Number(puntos), usuario);

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
      <div className="row">
        <div className="col-12 no-gutters">
          <div className="bg-uniandes text-light">
            <br />
            <h3 className="text-center">&nbsp;Catálogo de Beneficios&nbsp;</h3>
            <br />
          </div>
        </div>
        <div className="col-12">
          {this.agregarBeneficio()}
          {this.formCrearBeneficio()}
        </div>

        <div className="col-12">
          <ul>{this.renderBeneficios()}</ul>
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
