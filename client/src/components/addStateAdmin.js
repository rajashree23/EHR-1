import React from "react";
import { Link } from "react-router-dom";
import "../style.css";
import logo from "../../src/Logo.png"
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Employee from "./.cph/app";
import Web3 from 'web3';
import { Healthcare } from "./js/Healthcare.js";
//import ScrollContainer from 'react-indiana-drag-scroll'
class stateAdmin extends React.Component {

  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  async loadBlockchainData() {
    const web3 = window.web3
    // Load account
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })

    const contract = new web3.eth.Contract(Healthcare, "0xd62f4bb9ad5dbea866f31ce2b007f23520ca675c");
    this.setState({ contract })


    var account = await web3.eth.getAccounts()
    var fromAcc = account.toString();

    //calling smart contract

    const details = await this.state.contract.methods.hosAdminForState().call({ from: fromAcc });

    this.setState({ details: details });



  }





  constructor(props) {
    super(props);
    this.state = {
      details: [],
      name: "",
      hospital: "",
      web3: null,
      contract: null,
      account: null,
    }
  }
  render() {
    return (
      <div>
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

            <h3 className="text-center">ADD A ADMIN</h3>
            <br />
            <input className="form-control" placeholder="Enter Name..." onChange={(e) => { this.setState({ name: e.target.value }) }} />
            <br />
            <br />
            <input className="form-control" placeholder="Enter Hospital..." onChange={(e) => { this.setState({ hospital: e.target.value }) }} />
            <br />

            <Employee
              data={{
                "name": this.state.name,
                "hospital": this.state.hospital
              }}
              from={"stateAdmin"} />
          </div>
        </div>
        <div className="col-md-12 ml-auto mr-5 my-5 wrapper">
          <table class="table">
            <thead class="thead-dark">
              <tr>
                <th>Admin Name</th>
                <th>Admin Address</th>
                <th>Hospital Name</th>

              </tr>
            </thead>

            <tbody>
              {this.state.details.map(x =>
                <tr>
                  <td>{x.hosAdmin}</td>
                  <td>{x.name}</td>
                  <td>{x.hospital}</td>

                </tr>)}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default stateAdmin;