import React, { Fragment } from "react";
import { Link, NavLink } from 'react-router-dom';
import { logout } from "../services/auth";

export default function Navbar({ isAuthenticated, setIsAuthenticated }) {
  const handleClick = async () => {
    const res = await logout();

    if (res.success) {
      setIsAuthenticated(false)
    }
  }

  const authLinks = (
    <Fragment>
      <li className="nav-item">
        <NavLink className="nav-link" to="/dashboard">Dashboard</NavLink>
      </li>
      <li className="nav-item">
        <a className="nav-link" onClick={handleClick} href="#!">Logout</a>
      </li>
    </Fragment>
  )

  const guestLinks = (
    <Fragment>
      <li className="nav-item">
        <NavLink className="nav-link" to="/login">Login</NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/register">Register</NavLink>
      </li>
    </Fragment>
  )

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Session Auth
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink className="nav-link" to="/">Home</NavLink>
            </li>
            {/* If user is authenticated, show dashboard and logout - otherwise, show login and signup */}
            { isAuthenticated ? authLinks : guestLinks }
          </ul>
        </div>
      </div>
    </nav>
  );
}
