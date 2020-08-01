//Qr.js
import React, { Component } from "react";
import QrReader from "react-qr-reader";

class Test extends Component {
  state = {
    result: "",
    parab: true,
  };

  handleScan = (data) => {
    if (data) {
      if(data.startsWith("ethereum:"))
      data=data.slice(9);
      this.setState({
        result: data,
      },function(){
        this.props.gettingValues(this.state.result)
      });
    }
  };
  handleError = (err) => {
    console.error(err);
  };
  render() {
    return (
      <div>
        <div style={{ marginLeft: "30%", marginTop: "5%" }}>
          {this.state.parab ? (
            <QrReader
              delay={300}
              onError={this.handleError}
              onScan={this.handleScan}
              style={{ width: "50%" }}
            />
          ) : (
            "Address has been registered successfully/Data has been pushed to the address succeefully"
          )}
        </div>
        <input className="form-control"
          value={this.state.result}
          style={{ width: "100%", height: "100%", marginTop: "5%" }}></input>
      </div>
    );
  }
}
export default Test;
