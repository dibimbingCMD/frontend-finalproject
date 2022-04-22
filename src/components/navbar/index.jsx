import React, { useEffect, useState } from 'react';
import logo from '../../assets/img/logo.png';

import './style.scss';

export default function Navbar() {
  const [loggedIn, setLoggedIn] = useState(true);
  const RequiredAuth = () => {
    let isAuth = localStorage.getItem('access_token')
    if (!isAuth) {
      setLoggedIn(false)
    }
  }
  const logOut = () => {
    localStorage.clear();
    window.location = `/`
  };
  useEffect(() => {
    RequiredAuth();
  }, []);
  return (
    <>
      <header className="navigation-bar">
        <div className="container">
          <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
            <a href="/" className="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none">
            <img src={logo} alt="epl news" loading={"lazy"} height={"30px"} />
            </a>

            <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
              <li>
                <a href="/" className="nav-link px-2 text-white">
                  Home
                </a>
              </li>
              <li>
                <a href="/club" className="nav-link px-2 text-white">
                  Club
                </a>
              </li>
              <li>
                <a href="/categories" className="nav-link px-2 text-white">
                  Category
                </a>
              </li>
            </ul>

            <div className="text-end">
              {loggedIn && (<a className="btn btn-light me-2" onClick={() => {logOut()}}>Logout</a>)}
              {!loggedIn && (<a className="btn btn-light me-2" href='/login'>Login</a>)}
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
