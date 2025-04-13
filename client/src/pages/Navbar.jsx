import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ currUser, items }) => {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary sticky-top">
      <div className="container-fluid" style={{ fontSize: 'large' }}>
        <Link className="navbar-brand" to="/home">
          <img src="/images/download.png" style={{ height: '30px', width: '40px' }} alt="Kiara" />
          Kiara
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <div className="ms-auto">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" to="/home" aria-current="page">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/electronics">
                  Electronics
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/clothing/men">
                  Men
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/clothing/women">
                  Women
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/clothing/children">
                  Kids
                </Link>
              </li>
            </ul>
          </div>

          <div className="ms-auto">
            <form className="d-flex" role="search" action="/search" method="post">
              <input
                className="form-control me-2 search"
                type="search"
                placeholder="Search"
                aria-label="Search"
                name="categories"
              />
              <button className="btn btn-outline-info search-btn" type="submit">
                <i className="fa-solid fa-magnifying-glass"></i>
              </button>
            </form>
          </div>

          <div>
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {currUser ? (
                <>
                  <li className="nav-item">
                    <Link
                      className="nav-link"
                      to="/cart"
                      style={{ fontSize: '20px', marginLeft: '10px', fontWeight: 'normal' }}
                    >
                      <i className="fa-solid fa-cart-shopping"></i>
                      <sup id="items">{items || 0}</sup>
                    </Link>
                  </li>
                  <li className="nav-item dropdown">
                    <Link
                      className="nav-link dropdown-toggle"
                      to="#"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      {currUser.username}
                    </Link>
                    <ul className="dropdown-menu">
                      <li>
                        <Link className="dropdown-item" to="/logout">
                          Logout
                        </Link>
                      </li>
                      {currUser.role === 'admin' && (
                        <li>
                          <Link className="dropdown-item" to="/dashboard">
                            Dashboard
                          </Link>
                        </li>
                      )}
                    </ul>
                  </li>
                </>
              ) : (
                <li className="nav-item">
                  <Link className="nav-link" to="/login" style={{ fontSize: '25px' }}>
                    <i className="fa-solid fa-circle-user"></i>
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
