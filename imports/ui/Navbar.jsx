import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-md navbar-light bg-light py-md-2">
        <div className="container">
          <Link to={'/'} style={{ textDecoration: 'none' }}>
            <div className="navbar-brand">
              <img
                src="/planTuULogo.png"
                className="d-inline-block align-top"
                alt="Plan Tú U Logo"
                width="60px"
              />
            </div>
          </Link>
          <button
            className="navbar-toggler custom-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div id="navbarNavDropdown" className="navbar-collapse collapse">
            <ul className="navbar-nav mx-auto" />
            <ul className="navbar-nav">
              {/* <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="http://example.com"
                  id="navbarDropdownMenuLink"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Dropdown
                </a>
                <div
                  className="dropdown-menu"
                  aria-labelledby="navbarDropdownMenuLink"
                >
                  <a className="dropdown-item" href="#">
                    Action
                  </a>
                  <a className="dropdown-item" href="#">
                    Another action
                  </a>
                </div>
              </li> */}
              <li className="nav-item">
                <a className="nav-link" href="{{ url('/login') }}">
                  Iniciar sesión
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="{{ url('/register') }}">
                  Registrarse
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}
