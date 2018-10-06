import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Obtenidos } from '../api/obtenidos.js';

class PObtenidos extends Component {
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
    let Obtenidos = this.props.obtenidos;

    return Obtenidos.map(obtenido => (
      <Obtenido
        key={obtenido._id}
        obtenido={obtenido}
      />
    ));
  }

  render() {
    return (
      <div id="catalogoObtenidos" className="row">
        <div className="col-12">
          <div className="bg-uniandes text-light">
            <br />
            <h3 className="text-center font-weight-bold">
              &nbsp;Has obtenido beneficios por: &nbsp;
            </h3>
            <br />
          </div>
          <hr />
        </div>
        <div className="col-12">
          <ul className="list-group">{this.renderObtenidos()}</ul>
          <hr />
        </div>
      </div>
    );
  }
}

export default withTracker(() => {
  Meteor.subscribe('Obtenidos', localStorage.getItem('PTUusuario'));
  return {
    obtenidos: Obtenidos.find({}}).fetch()
  };
})(PObtenidos);
