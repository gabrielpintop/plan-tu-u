import React, { Component } from 'react';
import CatalogoBeneficios from './CatalogoBeneficios.jsx';
import { Route, Switch, Redirect } from 'react-router-dom';
import Navbar from './Navbar.jsx';
import Inicio from './Inicio.jsx';
import AdministracionPuntos from './AdministracionPuntos.jsx';
import AdministracionPuntosAdmin from './AdministracionPuntosAdmin.jsx';
import Registro from './Registro.jsx';
import Login from './Login.jsx';
import Footer from './Footer.jsx';
import CatalogoAsignaciones from './CatalogoAsignaciones.jsx';
import DashboardAdministrativo from './DashboardAdministrativo.jsx';

class App extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <div id="mainContainer" className="container container-fluid mt-3">
          <Switch>
            <Route exact path="/" component={Inicio} />
            <Route exact path="/beneficios" component={CatalogoBeneficios} />
            <Route exact path="/puntos" component={AdministracionPuntos} />
            <Route
              exact
              path="/dashboardAdministrativo"
              component={DashboardAdministrativo}
            />
            <Route
              exact
              path="/beneficiosRedimidos"
              component={AdministracionPuntosAdmin}
            />
            <Route
              exact
              path="/obtencionDePuntos"
              component={CatalogoAsignaciones}
            />
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
