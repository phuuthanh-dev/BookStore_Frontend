import React, { ChangeEvent, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Category } from "../../models/Category";
import { getCategories } from "../../api/CategoryAPI";
import CategoryItem from "../products/components/CategoryItem";
import { useNavigate } from 'react-router-dom';
import { Search } from "react-bootstrap-icons";
import { jwtDecode } from "jwt-decode";

interface NavbarProps {
  textSearch: string;
  setTextSearch: (text: string) => void;
}

interface JwtPayload {
  isAdmin: boolean;
  isStaff: boolean;
  isUser: boolean;
  username: string;
}


function Navbar({ textSearch, setTextSearch }: NavbarProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userLogin, setUserLogin] = useState("");

  const searchInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTextSearch(e.target.value);
  };

  // Enter after input search
  const navigate = useNavigate();
  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      navigate("/");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/user/login";
    setUserLogin("")
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      return;
    } else {
      // giải mã token
      const decodeToken = jwtDecode(token) as JwtPayload;
      console.log(decodeToken);

      // lấy thông tin cụ thể
      setUserLogin(decodeToken.username);
    }
  }, []);

  useEffect(() => {
    getCategories()
      .then((categoriesData) => {
        setCategories(categoriesData);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        setError(error.message);
      });
  }, []);

  if (loading) {
    return (
      <div className="container">
        <div className="row mt-4">
          <div className="col-12">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <div className="row mt-4">
          <div className="col-12">
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">
          Bookstore
        </NavLink>
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
              <NavLink className="nav-link active" aria-current="page" to="/">
                Home
              </NavLink>
            </li>
            <li className="nav-item dropdown">
              <NavLink
                className="nav-link dropdown-toggle"
                to="index.html"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Categories
              </NavLink>
              <ul className="dropdown-menu">
                {categories.map((category) => (
                  <CategoryItem category={category} key={category.id} />
                ))}
              </ul>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link" to="/contact">
                Contact
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/about">
                About
              </NavLink>
            </li>
          </ul>
          <div className="d-flex" role="search">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              onInput={searchInputChange}
              value={textSearch}
              onKeyPress={handleKeyPress}
            />
            <button className="btn btn-outline-success" type="submit">
              <Search />
            </button>
          </div>
          <ul className="navbar-nav me-1">
            <li className="nav-item">
              <NavLink className="nav-link" to="/cart">
                <i className="fas fa-shopping-cart"></i>
              </NavLink>
            </li>
          </ul>
          {
            !userLogin ?
              <ul className="navbar-nav me-1">
                <li className="nav-item">
                  <NavLink className="nav-link" to="/user/login">
                    <i className="fas fa-user"></i>
                  </NavLink>
                </li>
              </ul> : ""}
          {
            userLogin ?
              <ul className="navbar-nav me-1 text-light">Hello, {userLogin}</ul> : ""}
          {
            userLogin ?
              <ul className="navbar-nav me-1">
                <li className="nav-item">
                  <button className="nav-link" onClick={handleLogout}>
                    Logout
                  </button>
                </li>
              </ul> : ""}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
