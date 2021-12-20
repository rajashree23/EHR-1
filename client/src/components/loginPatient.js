import React from "react";
import { Link } from "react-router-dom";
import "../style.css";
import logo from "../../src/Logo.png"
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Web3 from 'web3'
import { Healthcare } from "./js/Healthcare";
 import { encryptKey, encryptFile, decryptKey ,decryptFile, uintToString } from "./js/encryption.js";
 import ipfs from './js/ipfs';
const FileSaver = require('file-saver');



class loginPatient extends React.Component {
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

    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })
   
      const contract = new web3.eth.Contract(Healthcare, "0xE847595d5Ce0675ef88Bc6d961E07b9E27A259FD")
      this.setState({ contract })

    const len = await this.state.contract.methods.recordPatCount().call({ from: this.state.account });
    console.log(len);
    var i;
    var name;
    var data = [];

    for (i = len-1; i >= 0; i--) {
     
      var temp = {};
      const details = await this.state.contract.methods.recordPatDetails(i).call({ from: this.state.account });
      console.log(details);
      if (details[2] === "doctor"){
        name = await this.state.contract.methods.returnDocName(details[3]).call({ from: this.state.account });
        console.log(name);
      }
      else{
        name = await this.state.contract.methods.returnLabName(details[3]).call({ from: this.state.account });
        console.log(name)
      }
        temp = {
        "record": details[0],
        "address": details[3],
        "name": name,
        "role": details[2],
        "timestamp": details[1],
      }
      data.push(temp);
    }
    this.setState({ data: data });
 console.log(data);
  }
  constructor(props) {
    super(props)

    this.state = {
      patientHash: '',
      contract: null,

      web3: null,

      account: null,


      data: [],

    }
  }
  
   async downloadFile(hash){
    console.log("download");
    const encryptedKey = await this.state.contract.methods.retrieveKey(hash).call({ from: this.state.account });
    console.log(encryptedKey);
    if (encryptedKey === "") {
      alert('not permitted for this record');
    }
    else {

      const decryptedKey = decryptKey(encryptedKey, this.state.account);
      console.log("key",decryptedKey);
      ipfs.get(hash, function (err, files) {
        files.forEach((file) => {
         
          const content = uintToString(file.content);
        
          const decryptedfile = decryptFile(content, decryptedKey);
          // alert(decryptedfile)
          var blob = new Blob([decryptedfile], { type: "text/plain;charset=utf-8" });
          FileSaver.saveAs(blob, "doc.txt");

        })
      })



    }
  }
  render() {
    const detail = this.state.data.map(x =>
      <tr>
         <td><a href={"https://ipfs.infura.io/ipfs/" + x.record} onClick={()=>this.downloadFile(x.record)} target='_blank'>{x.record}</a></td>
        <td>{x.address}</td>
        <td>{x.name}</td>
        <td>{x.role}</td>
        <td>{x.timestamp}</td>

        <td>
        <Link to={{
            pathname: '/revoke',
            state: {recRevoke: x.record}
          }}>
            <button type="button" class="btn btn-danger btn-sm" onClick={null}>
              REVOKE
            </button>
          </Link>
        </td>
        <td>
        <Link to={{
            pathname: '/permit',
            state: {recRevoke: x.record}
          }}>
            <button id='permit'
              type="button"
              class="btn btn-success btn-sm"
              data-toggle="modal"
              data-target="#permitModal"
              onClick={null}
            >
              PERMIT
            </button>
          </Link>
        </td>
      </tr>
    );

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
        <div className="container-fluid" style={{padding:'25px !important'}}>
          <br />
          <br />
          <table class="table">
            <thead class="thead-dark">
              <tr>
                <th>Records</th>
                <th>Address</th>
                <th>Name</th>
                <th>Role</th>
                <th>Timestamp</th>
                <th>Revoke</th>
                <th>Permit</th>
              </tr>
            </thead>
            <tbody>
              {detail}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default loginPatient;