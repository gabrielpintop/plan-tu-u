import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class Dashboard extends Component {
  constructor(props) {
    super(props);

    if (!localStorage.getItem('PTUusuario')) {
      this.props.history.push('/');
    }
  }

  render() {
    return (
      <div className="row">
        <div className="col-12">
          <div className="bg-uniandes text-light">
            <br />
            <h3 className="text-center font-weight-bold">
              &nbsp;Dashboard administrativo&nbsp;
            </h3>
            <br />
          </div>
          <hr />
        </div>
      </div>
    );
  }
}

export default withRouter(Dashboard);
