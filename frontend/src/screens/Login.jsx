import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { login } from "../services/auth";
import CSRFToken from "../components/CSRFToken";

export default function Login({ isAuthenticated, setIsAuthenticated}) {
  const [formData, setFormData] = useState({
    username: "",
    password: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await login(formData);

    if (res.data.success) {
      setIsAuthenticated(true)
    }
  };

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="container mt-5">
      <h1>Sign In</h1>
      <p>Welcome back to your account with Session Auth</p>
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
        <button className="btn btn-primary mt-3" type="submit">
          Log In
        </button>
      </form>
      <p className="mt-3">
        Don't have an Account? <Link to="/register">Sign Up</Link>
      </p>
    </div>
  );
}
