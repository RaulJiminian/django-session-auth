import React, { Fragment, useEffect } from 'react';
import Navbar from '../components/Navbar';
// import { checkAuthenticated } from '../services/auth';
// import { load_user } from '../services/profile';

export default function Layout({ children, isAuthenticated, setIsAuthenticated, setUser }) {

  useEffect(() => {
    let options = {
      method: 'GET',
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: 'include',
    }
  
    let userOptions = {
      method: 'GET',
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: 'include',
    }

    fetch('http://localhost:8000/accounts/authenticated', options).then((response) => {
      return response.json()
    }).then((data) => {
      console.log(data)
      if (data.error || data.isAuthenticated === "error") {
        setIsAuthenticated(false);
      } else if (data.isAuthenticated === "success") {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }

      fetch('http://localhost:8000/profile/user', userOptions).then((response) => {
        return response.json()
      }).then((data) => {
        // console.log(data)
        // setIsAuthenticated(true)
        setUser(data)
      })
    })
  }, [])

  return (
    <Fragment>
      <Navbar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated}/>
      {children}
    </Fragment>
  )
}

// useEffect(() => {
//   const checkAuth = async () => {
//     const response = await checkAuthenticated();
//     setIsAuthenticated(response);
//     const userData = await load_user();
//     setUser(userData);
//   }
//   checkAuth()
// }, [])
