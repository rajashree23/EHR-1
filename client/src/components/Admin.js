import React from "react";
import {  Link } from "react-router-dom";
import "../style.css";
import logo from "../../src/Logo.png"
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";

class Admin extends React.Component {
    render() {
      return (
        <div>
         <nav className="navbar navbar-expand-sm bg-dark navbar-light">
            <div
              className="nav-item active"
              style={{ color: "black", fontWeight: "bolder" }}
            >
              <img src={logo} width="50px" height="50px" />
            </div>
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to="/">
                  <a className="nav-link" style={{ color: "white" }}>
                    HOME
                  </a>
                </Link>
              </li>
            </ul>
          </nav>
          <div className="container" style={{ padding: "10%" }}>
            <Link to="/admin/addDoctor">
              <button className="btn btn-success mx-5" onClick={null}>ADD A DOCTOR</button>
            </Link>
            <Link to="/admin/addLab">
              <button className="btn btn-success mx-4" onClick={null}>
                ADD A LAB TECHNICIAN
              </button>
            </Link>
            <Link to="/admin/addReception">
              <button className="btn btn-success mx-5" onClick={null}>ADD A RECEPTIONIST</button>
            </Link>
          </div>
        </div>
      );
    }
  }

export default Admin;