import React from "react";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <a className="navbar-brand" href="index.html">
          Bookstore
        </a>
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
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a
                className="nav-link active"
                aria-current="page"
                href="index.html"
              >
                Home
              </a>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="index.html"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Categories
              </a>
              <ul className="dropdown-menu">
                <li>
                  <a className="dropdown-item" href="index.html">
                    Action
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="index.html">
                    Another action
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="index.html">
                    Something else here
                  </a>
                </li>
              </ul>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="index.html">
                Contact
              </a>
            </li>
          </ul>
          <form className="d-flex" role="search">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button className="btn btn-outline-success" type="submit">
              Search
            </button>
          </form>
          <ul className="navbar-nav me-1">
            <li className="nav-item">
                <a className="nav-link" href="#">
                    <i className="fas fa-shopping-cart"></i>
                </a>
            </li>
          </ul>

          <ul className="navbar-nav me-1">
            <li className="nav-item">
                <a className="nav-link" href="#">
                    <i className="fas fa-user"></i>
                </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;