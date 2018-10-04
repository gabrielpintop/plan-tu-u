import React, { Component } from 'react';
import CatalogoBeneficios from './CatalogoBeneficios.jsx';

class App extends Component {
  render() {
    return (
      <div className="container container-fluid">
        <header>
          <h1>Beneficios Uniandes</h1>
        </header>

        <CatalogoBeneficios />
      </div>
    );
  }
}

export default App;
