import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { onLogout } from '../../reducers/auth';

function refreshPage() {
  window.location.reload();
}

export class Header extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    onLogout: PropTypes.func.isRequired,
  };


  _onLogout = e => {
    this.props.onLogout()
    // window.location.href = window.location.href;
    window.location.replace('');
    // refreshPage()
  }

  render() {
    const { isLogin, user } = this.props.auth;

    const SessionLinks = (
      <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
        <li className="nav-item">
          <strong>
            <Link to="/" className="nav-link">
              {user ? `${user.username}` : ''}
            </Link>
          </strong>
        </li>
        <li className="nav-item">
          <button onClick={this._onLogout} className="nav-link btn btn-info btn-sm text-light">
            Salir
          </button>
        </li>
      </ul>
    );

    const NoSessionButtons = (
      <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
        <li className="nav-item">
          <Link to="/register" className="nav-link">
            Registrarse
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/login" className="nav-link">
            Ingresar
          </Link>
        </li>
      </ul>
    );

    return (
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
        <div className="container">
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <a className="navbar-brand" href="/#/home">
              Cian Coders
            </a>
          </div>
          {isLogin ? SessionLinks : NoSessionButtons}

        </div>
      </nav>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { onLogout })(Header);