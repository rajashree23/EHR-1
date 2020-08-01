import React, { Component } from "react";
import "../../style.css";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import QR from "./qr";
import Web3 from 'web3';
import { Healthcare } from "../js/Healthcare.js"


const cryptoRandomString = require('crypto-random-string');

// import {generate} from "..js/aeskey.js"
class Employee extends Component {


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

    const contract = new web3.eth.Contract(Healthcare, "0x1c270d26a933a52a7171421407061eed769a08ba");
    this.setState({ contract })


    var account = await web3.eth.getAccounts()
    var fromAcc = account.toString();
  }

  constructor(props) {
    super(props);
    this.state = {
      cam: false,
      web3: null,
      contract: null,
      account: null,
      value: ""
    };
  }

  async addPatient() {
    this.state.contract.methods.addPatient(this.state.value, this.props.data).send({ from: this.state.account }).then((r) => {
      console.log("added patient");
      window.alert('Patient added successfully')
      return window.location.reload();
    })

  }
  async addDoctor() {
    this.state.contract.methods.addDoctor(this.state.value, this.props.data).send({ from: this.state.account }).then((r) => {
      console.log("added doc");
      window.alert('Doctor added successfully')
      return window.location.reload();
    })

  }
  async addLab() {
    this.state.contract.methods.addLab(this.state.value, this.props.data).send({ from: this.state.account }).then((r) => {
      console.log("added lab");
      window.alert('Lab added successfully')
      return window.location.reload();
    })

  }
  async addStateAdmin() {
    console.log(this.props.data);
    console.log(this.props.data.name);
    this.state.contract.methods.addStateAdmin(this.state.value,this.props.data.name,this.props.data.statename).send({ from: this.state.account }).then((r) => {
      console.log("added admin");
      window.alert('State admin added successfully')
      return window.location.reload();
    })

  }
  async addAdmin() {
    console.log(this.state.value);
    this.state.contract.methods.addHospitalAdmins(this.state.value,this.props.data.name,this.props.data.hospital).send({ from: this.state.account }).then((r) => {
      console.log("added admin");
      window.alert('Admin added successfully')
      return window.location.reload();
    })

  }
  async addReceptionist() {
    this.state.contract.methods.addReceptionist(this.state.value, this.props.data).send({ from: this.state.account }).then((r) => {
      console.log("added recep");
      window.alert('Receptionist added successfully')
      return window.location.reload();
    })

  }


  //doc and lab upload record
 


  //permit
  
  getValueFromChild(value) {
    console.log(value);
    this.setState({
      value: value
    })
  }

  render() {
    return (
      <>
        <input
          className="form-control"
          value={this.state.value}
          onChange={(e) => {
            this.setState({ value: e.target.value });
          }}
          style={{
            width: "100%",
            height: "100%",
            marginTop: "5%",
            marginBottom: "5%",
          }}
          placeholder="Enter Public Address"></input>
        <p className="text-center">OR</p>
        <button
          className="btn btn-success btn-block my-2"
          onClick={() => {
            this.setState({ cam: !this.state.cam });
          }}
        >
          {this.state.cam ? "Close QR code Scanner" : "Open QR code Scanner"}
        </button>

        <p className="my-2 text-dark">
          {" "}
          {this.state.cam ? <QR gettingValues={this.getValueFromChild.bind(this)} /> : "Click on button to read Qr data"}{" "}
        </p>


        {this.props.from === "recepPat" && <button type='submit'
          onClick={() => {
            this.setState({ parab: !this.state.parab });
            this.addPatient();

          }}
          className="btn btn-success my-2"
        >
          Submit
        </button>}
        {this.props.from === "superAdmin" && <button type='submit'
          onClick={() => {
            this.setState({ parab: !this.state.parab });

            this.addStateAdmin();

          }}
          className="btn btn-success my-2"
        >
          Submit
        </button>}
        {this.props.from === "stateAdmin" && <button type='submit'
          onClick={() => {
            this.setState({ parab: !this.state.parab });

            this.addAdmin();

          }}
          className="btn btn-success my-2"
        >
          Submit
        </button>}
        {this.props.from === "adminDoc" && <button type='submit'
          onClick={() => {
            this.setState({ parab: !this.state.parab });
            this.addDoctor();

          }}
          className="btn btn-success my-2"
        >
          Submit
        </button>}
        {this.props.from === "adminLab" && <button type='submit'
          onClick={() => {
            this.setState({ parab: !this.state.parab });
            this.addLab();

          }}
          className="btn btn-success my-2"
        >
          Submit
        </button>}
        {this.props.from === "adminRecep" && <button type='submit'
          onClick={() => {
            this.setState({ parab: !this.state.parab });
            this.addReceptionist();

          }}
          className="btn btn-success my-2"
        >
          Submit
        </button>}
      </>
    );
  }
}
export default Employee;
