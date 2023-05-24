import React from "react";
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div>
      <header className="fixed-top shadow-sm">
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container">
            <NavLink className="navbar-brand fw-semibold fs-3" to="/">
              Questionnaire
            </NavLink>

            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarText"
              aria-controls="navbarText"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarText">
              <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <NavLink className="nav-link" to="/create-question">
                    Create-Question
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/list-question">
                    Question-List
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/">
                    Question-Manage
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default Navbar;
