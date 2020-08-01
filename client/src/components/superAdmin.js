import React from "react";
import { Link } from "react-router-dom";
import "../style.css";
import logo from "../../src/Logo.png"
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Employee from "./.cph/app";
class superAdmin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name:"",
      statename:""
    }
  }
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
          <h3 className="text-center">ADD A STATE ADMIN</h3>
          <br />
          <br />
            <input className="form-control" placeholder="Enter Name..." onChange={(e) => { this.setState({ name: e.target.value }) }} />
            <br />
            <br />
            <input className="form-control" placeholder="Enter State..." onChange={(e) => { this.setState({ statename: e.target.value }) }} />
            <br />
          <Employee 
         data={{"name":this.state.name,
        "statename":this.state.statename}}
          from ={"superAdmin"}/>
        </div>
      </div>
    );
  }
}

export default superAdmin;
