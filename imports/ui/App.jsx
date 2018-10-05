import React, { Component } from 'react';
import CatalogoBeneficios from './CatalogoBeneficios.jsx';
import Navbar from './Navbar.jsx';

class App extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <div className="container container-fluid">
          <header>
            <h1>Beneficios Uniandes</h1>
          </header>

          <CatalogoBeneficios />
        </div>
      </div>
    );
  }
}

export default App;
