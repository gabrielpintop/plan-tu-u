import React, { Component } from 'react';
import CatalogoBeneficios from './CatalogoBeneficios.jsx';
import { Route, Switch, Redirect } from 'react-router-dom';
import Navbar from './Navbar.jsx';
import Inicio from './Inicio.jsx';
import UsuarioDetail from './UsuarioDetail.jsx';
import Registro from './Registro.jsx';
import Login from './Login.jsx';
import Footer from './Footer.jsx';
import Dashboard from './Dashboard.jsx';

const options = {
  timeout: 5000,
  position: 'bottom center'
};

class App extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <div id="mainContainer" className="container container-fluid mt-3">
          <Switch>
            <Route exact path="/" component={Inicio} />
            <Route exact path="/beneficios" component={CatalogoBeneficios} />
            <Route exact path="/puntos" component={UsuarioDetail} />
            <Route exact path="/dashboardAdministrador" component={Dashboard} />
            <Route exact path="/registro" component={Registro} />
            <Route exact path="/login" component={Login} />
            <Redirect from="*" to="/" />
          </Switch>
        </div>
        <br />
        <Footer />
      </div>
    );
  }
}

export default App;
