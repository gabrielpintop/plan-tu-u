import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';

class Redimido extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redimido: this.props.redimido,
    };
  }

  componentWillReceiveProps(nextProps) {
      this.setState({
        redimido: nextProps.redimido,
      });
  }


  render() {
    return (
      <li className="list-group-item">
        <div className="row">
          <div className="col-md-9 col-12">
            <p>{this.state.beneficio.beneficio}</p>
          </div>
        </div>
      </li>
    );
  }
}

export default Redimido;
