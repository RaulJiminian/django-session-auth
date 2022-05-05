import React, { Fragment } from 'react';
import Navbar from '../components/Navbar';

export default function Layout({children, isAuthenticated, setIsAuthenticated}) {
  return (
    <Fragment>
      <Navbar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated}/>
      {children}
    </Fragment>
  )
}
