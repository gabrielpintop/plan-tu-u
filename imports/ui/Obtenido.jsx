import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';

class Obtenido extends Component {
  constructor(props) {
    super(props);

    this.state = {
      obtenido: this.props.obtenido,
    };
  }

  componentWillReceiveProps(nextProps) {
      this.setState({
        obtenido: nextProps.obtenido,
      });
  }

  render() {
    return (
      <li className="list-group-item">
        <div className="row">
          <div className="col-md-9 col-12">
            <p>{this.state.obtenido}</p>
          </div>
        </div>
      </li>
    );
  }
}

export default Obtenido;
