import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { register } from "../services/auth";
import CSRFToken from "../components/CSRFToken";

export default function Register({isAuthenticated}) {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    re_password: "",
  });

  const [accountCreated, setAccountCreated] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { password, re_password } = formData;

    if (password === re_password) {
      register(formData);
      setAccountCreated(true);
    }
  };

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  } else if (accountCreated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="container mt-5">
      <h1>Register for an Account</h1>
      <p>Create an account with our Session Auth application</p>
      <form onSubmit={handleSubmit}>
        <CSRFToken />
        <div className="form-group">
          <label className="form-label">Username: </label>
          <input
            className="form-control"
            type="text"
            placeholder="Username*"
            name="username"
            onChange={handleChange}
            value={formData.username}
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label mt-3">Password: </label>
          <input
            className="form-control"
            type="password"
            placeholder="Password*"
            name="password"
            onChange={handleChange}
            value={formData.password}
            minLength="6"
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label mt-3">Confirm Password: </label>
          <input
            className="form-control"
            type="password"
            placeholder="Confirm Password*"
            name="re_password"
            onChange={handleChange}
            value={formData.re_password}
            minLength="6"
            required
          />
        </div>
        <button className="btn btn-primary mt-3" type="submit">
          Register
        </button>
      </form>
      <p className="mt-3">
        Already have an Account? <Link to="/login">Sign In</Link>
      </p>
    </div>
  );
}
