import React, { Component } from 'react';
import CatalogoBeneficios from './CatalogoBeneficios.jsx';
import { Route, Switch, Redirect } from 'react-router-dom';
import Navbar from './Navbar.jsx';
import Inicio from './Inicio.jsx';
import Puntos from './Puntos.jsx';

class App extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <div className="container container-fluid mt-3">
          <Switch>
            <Route exact path="/" component={Inicio} />
            <Route exact path="/beneficios" component={CatalogoBeneficios} />
            <Route exact path="/puntos" component={Puntos} />
            <Redirect from="*" to="/" />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
