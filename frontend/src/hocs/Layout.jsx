import React, { Fragment, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { checkAuthenticated } from '../services/auth';
import { load_user } from '../services/profile';

export default function Layout({ children, isAuthenticated, setIsAuthenticated, setUser }) {
  
  useEffect(() => {
    const checkAuth = async () => {
      const response = await checkAuthenticated();
      setIsAuthenticated(response);
      const userData = await load_user();
      setUser(userData);
    }
    checkAuth()
  }, [])
  
  return (
    <Fragment>
      <Navbar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated}/>
      {children}
    </Fragment>
  )
}
