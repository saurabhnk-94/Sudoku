import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

class Box extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      count: 3,
      color: "#808080",
      disabled: false
    };
    this.checkValue = this.checkValue.bind(this);
  }

  checkValue(number) {
    let num = parseInt(number);
    if (num>= 0) {
      console.log(num);
      if (num !== this.props.answer) {
        this.props.counter();
        this.setState({
          count: --this.state.count 
        });
        alert(this.state.count + " Chances Left");
        if (this.state.count == 2) {  
          this.setState({
            value: num,
            color: "#ffa500",
            disabled: false
          });
        }
        else if (this.state.count == 1) {
          this.setState({
            value: num,
            color: "#0000ff",
            disabled: false
          });
        }
        else if (this.state.count == 0) {
          this.setState({
            value: num,
            color: "#ff0000",
            disabled: true
          });
        }
      } else {
        this.setState({
          value: num,
          color: "green",
          disabled: true
        });
      }
    }
  }

  render() {
    return (
      <div className="grid-box">
        {this.props.number ? (
          <div className="given-number">{this.props.number}</div>
        ) : this.props.answer ? (
          <input
            type="text"
            onChange={() => this.checkValue(event.target.value)}
            style={{ backgroundColor: this.state.color }}
            disabled={(this.state.disabled) ? "disabled" : ""}
            className="dynamic-number"
            maxLength={1}
          />
        ) : null}
      </div>
    );
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      total_count: 0
    };
    this.valueDisplay = this.valueDisplay.bind(this);
  }

  displayCount() {
    this.setState({
      total_count: ++this.state.total_count
    });
  }

  valueDisplay() {
    return this.state.total_count;
  }

  render() {
    return (
      <div className="full-box">
        <div className="main-box">
          <div className="box">
            <Box number={3} />
            <Box answer={1} counter={() => this.displayCount()} />
            <Box answer={2} counter={() => this.displayCount()} />
            <Box number={4} />
          </div>
          <div className="box">
            <Box answer={1} counter={() => this.displayCount()} />
            <Box number={3} />
            <Box number={4} />
            <Box answer={2} counter={() => this.displayCount()} />
          </div>
        </div>
        <div className="main-box">
          <div className="box">
            <Box answer={4} counter={() => this.displayCount()} />
            <Box number={2} />
            <Box number={1} />
            <Box answer={3} counter={() => this.displayCount()} />
          </div>
          <div className="box">
            <Box number={2} />
            <Box answer={4} counter={() => this.displayCount()} />
            <Box answer={3} counter={() => this.displayCount()} />
            <Box number={1} />
          </div>
        </div>
        <div className="Incorrect">
          <div className="statement">Total Incorrect Answers :</div>
          <input
            type="text"
            className="box-value"
            onChange={this.valueDisplay}
            value={this.state.total_count}
            style={{ color: "red" }}
          />
        </div>
      </div>
    );
  }
}

export default App;
