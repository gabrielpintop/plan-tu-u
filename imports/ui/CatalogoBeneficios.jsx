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
      token: localStorage.getItem('PTUusuario'),
      admin: false,
      usuario: null
    };

    this.toggleFormAgregarBeneficios = this.toggleFormAgregarBeneficios.bind(
      this
    );
  }

  componentDidMount() {
    Meteor.call('usuarios.decodificar', this.state.token, (err, res) => {
      if (err) {
        alert(err.error);
      } else if (res) {
        if (res.rol === 'adminPTU') {
          this.setState({
            botonAgregarBeneficio: true,
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
      <Beneficio
        key={beneficio._id}
        beneficio={beneficio}
        admin={this.state.admin}
        usuario={this.state.usuario}
      />
    ));
  }

  agregarBeneficio() {
    if (this.state.botonAgregarBeneficio) {
      return (
        <div className="text-center">
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
      <div id="catalogoRedimidos" className="container-fluid">
    <div className="col-12">
        <div className="bg-uniandes text-light">
            <br />
            <h3 className="text-center font-weight-bold">
              &nbsp;Catálogo de Beneficios&nbsp;
            </h3>
            <br />
        </div>
        <hr />
    </div>
    {this.formCrearBeneficio()}
    <div className="col-12 text-center">{this.agregarBeneficio()}</div>
    <div className="row">
        <div className="col-12">
            <ul className="nav nav-pills nav-fill" id="myTab" role="tablist">
                <li className="nav-item ">
                    <a
                  className="nav-link black-buttons text-warning active"
                  id="tab-gratuitos"
                  data-toggle="tab"
                  href="#gratuitos"
                  role="tab"
                  aria-controls="beneficios-gratuitos"
                >
                  Beneficios gratuitos
                </a>
                </li>
                <li className="nav-item">
                    <a
                  className="nav-link black-buttons text-warning"
                  id="tab-bronce"
                  data-toggle="tab"
                  href="#bronce"
                  role="tab"
                  aria-controls="beneficios-bronce"
                >
                  Beneficios bronce
                </a>
                </li>
                <li className="nav-item">
                    <a
                  className="nav-link black-buttons text-warning"
                  id="tab-plata"
                  data-toggle="tab"
                  href="#plata"
                  role="tab"
                  aria-controls="beneficios-plata"
                  aria-selected="false"
                >
                  Beneficios plata
                </a>
                </li>
                <li className="nav-item">
                    <a
                  className="nav-link black-buttons text-warning"
                  id="tab-oro"
                  data-toggle="tab"
                  href="#oro"
                  role="tab"
                  aria-controls="beneficios-oro"
                  aria-selected="false"
                >
                  Beneficios oro
                </a>
                </li>
            </ul>
        </div>
    </div>
    <hr/>
    <div className="tab-content" id="myTabContent">
        <div className="tab-pane fade show active" id="gratuitos" role="tabpanel" aria-labelledby="beneficios-tab">
            <div className="col-12">
                <div className="bg-gratuitos rounded-top">
                    <br />
                    <h4 className="text-center">
              <img
                className="mw-100 img-fluid"
                src="gratuito.png"
                width="60px"
                alt=""
              />
              &nbsp;Beneficios gratuitos&nbsp;
            </h4>
                    <br />
                </div>
                <ul className="list-group">{this.renderBeneficios(-1, 1)}</ul>
                <hr />
            </div>
        </div>
        <div className="tab-pane fade" id="bronce" role="tabpanel" aria-labelledby="puntos-tab">
            <div className="col-12">
                <div className="bg-bronce rounded-top">
                    <br />
                    <h4 className="text-center">
              <img
                className="mw-100 img-fluid"
                src="bronce.png"
                width="60px"
                alt=""
              />
              &nbsp;Beneficios bronce (1 - 100)&nbsp;
            </h4>
                    <br />
                </div>
                <ul className="list-group">{this.renderBeneficios(0, 101)}</ul>
                <hr />
            </div>
        </div>
        <div className="tab-pane fade" id="plata" role="tabpanel" aria-labelledby="puntos-tab">
            <div className="col-12">
                <div className="bg-plata rounded-top">
                    <br />
                    <h4 className="text-center">
              <img
                className="mw-100 img-fluid"
                src="plata.png"
                width="60px"
                alt=""
              />
              &nbsp;Beneficios plata (101 - 500)&nbsp;
            </h4>
                    <br />
                </div>
                <ul className="list-group">{this.renderBeneficios(100, 501)}</ul>
                <hr />
            </div>
        </div>
        <div className="tab-pane fade" id="oro" role="tabpanel" aria-labelledby="puntos-tab">
            <div className="col-12">
                <div className="bg-oro rounded-top">
                    <br />
                    <h4 className="text-center">
              <img
                className="mw-100 img-fluid"
                src="oro.png"
                width="60px"
                alt=""
              />
              &nbsp;&nbsp;Beneficios oro (+500)&nbsp;
            </h4>
                    <br />
                </div>
                <ul className="list-group">{this.renderBeneficios(500, -1)}</ul>
                <hr />
            </div>
        </div>
    </div>
</div>
    );
  }
}

export default withTracker(() => {
  Meteor.subscribe('beneficios');
  return {
    beneficios: Beneficios.find({}, { sort: { puntosRequeridos: 1 } }).fetch()
  };
})(CatalogoBeneficios);
