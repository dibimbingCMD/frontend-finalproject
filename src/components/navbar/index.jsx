import React, { useEffect, useState } from 'react';

import './style.scss';
const clubs = require('../../clubs.json');

export default function Navbar() {
  const [club, setClub] = useState([]);
  const [loggedIn, setLoggedIn] = useState(true);
  const getClub = () => {
    setClub(clubs.clubs);
  };
  const category = [];
  // db.news.map((d) =>
  //   d.category.map((dd) => {
  //     if (!category.includes(dd)) {
  //       category.push(dd);
  //     }
  //   })
  // );
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
    getClub();
    RequiredAuth();
  }, []);
  console.log(category);
  return (
    <>
      <header className="navigation-bar">
        <div className="container">
          <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
            <a href="/" className="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none">
              news
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
              <li>
                <a href="#" className="nav-link px-2 text-white">
                  About
                </a>
              </li>
            </ul>

            <form className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3">
              <input type="search" className="form-control form-control-dark" placeholder="Search..." aria-label="Search" />
            </form>

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
