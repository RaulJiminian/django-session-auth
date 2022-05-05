import React, { useState, useEffect } from "react";
import { update_profile } from "../services/profile";

export default function Dashboard({user, setUser}) {
  const [formData, setFormData] = useState({
    first_name: user?.profile.first_name,
    last_name: user?.profile.last_name,
    phone: user?.profile.phone,
    city: user?.profile.city,
  });

  useEffect(() => {
    setFormData({
      first_name: user?.profile.first_name,
      last_name: user?.profile.last_name,
      phone: user?.profile.phone,
      city: user?.profile.city,
    }) 
    
  }, [user])

  const { first_name, last_name, phone, city } = formData;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await update_profile(formData);
    setUser(res.data);
  };

  return (
    <div className="container">
      <h1 className="mt-3">Welcome to your User Dashboard</h1>
      <p className="mt-3 mb-3">Update your user profile below:</p>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label" htmlFor="first_name">
            First Name
          </label>
          <input
            className="form-control"
            type="text"
            name="first_name"
            placeholder="first_name"
            onChange={handleChange}
            value={first_name}
          />
        </div>
        <div className="form-group">
          <label className="form-label mt-3" htmlFor="last_name">
            Last Name
          </label>
          <input
            className="form-control"
            type="text"
            name="last_name"
            placeholder="last_name"
            onChange={handleChange}
            value={last_name}
          />
        </div>
        <div className="form-group">
          <label className="form-label mt-3" htmlFor="phone">
            Phone
          </label>
          <input
            className="form-control"
            type="text"
            name="phone"
            placeholder="phone"
            onChange={handleChange}
            value={phone}
          />
        </div>
        <div className="form-group">
          <label className="form-label mt-3" htmlFor="city">
            City
          </label>
          <input
            className="form-control"
            type="text"
            name="city"
            placeholder="city"
            onChange={handleChange}
            value={city}
          />
        </div>
        <button className="btn btn-primary mt-3" type="submit">
          Update Profile
        </button>
      </form>
      <p className="mt-5">
        Click the button below to delete your user account:
      </p>
      {/* <a className="btn btn-danger" href="#!" onClick={delete_account}>
        Delete Account
      </a> */}
    </div>
  );
}
