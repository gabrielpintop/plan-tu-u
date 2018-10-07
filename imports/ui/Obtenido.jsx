import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';

class Obtenido extends Component {
  constructor(props) {
    super(props);

    this.state = {
      descripcion: this.props.descripcion,
    };
  }

  componentWillReceiveProps(nextProps) {
      this.setState({
        descripcion: nextProps.descripcion,
      });
  }

  render() {
    return (
      <li className="list-group-item">
        <div className="row">
          <div className="col-md-9 col-12">
            <p>{this.state.descripcion}</p>
          </div>
        </div>
      </li>
    );
  }
}

export default Obtenido;
