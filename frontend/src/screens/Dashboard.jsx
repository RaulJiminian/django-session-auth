import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import { update_profile } from "../services/profile";
import { delete_account } from "../services/auth";
import CSRFToken from "../components/CSRFToken";
import Cookies from "js-cookie";

export default function Dashboard({user, setUser, setIsAuthenticated}) {
  const [formData, setFormData] = useState({
    first_name: user?.profile.first_name,
    last_name: user?.profile.last_name,
    phone: user?.profile.phone,
    city: user?.profile.city,
  });

  let navigate = useNavigate();

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

  const handleDelete = async () => {
    const res = await delete_account()

    if (res.data.success) {
      setIsAuthenticated(false)
      navigate('/')
    }
  }

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   const res = await update_profile(formData);
  //   setUser(res.data);
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let options = {
      method: 'PUT',
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-CSRFToken": Cookies.get("csrftoken")
      },
      credentials: 'include',
      body: JSON.stringify(formData)
    }

    fetch('http://localhost:8000/profile/update', options).then((response) => {
      return response.json()
    }).then((data) => {
      console.log(data)
      setUser(data.data)
    })
  };

  return (
    <div className="container">
      <h1 className="mt-3">Welcome to your User Dashboard</h1>
      <p className="mt-3 mb-3">Update your user profile below:</p>
      <form onSubmit={handleSubmit}>
      <CSRFToken />
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
      <button className="btn btn-danger" onClick={handleDelete}>
        Delete Account
      </button>
    </div>
  );
}
