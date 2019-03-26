import React, { Component } from "react";
import happyDoge from "./happyDoge.jpg";
import sadDoge from "./sadDoge.jpg";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      response: "",
      post: "",
      responseToPost: "",
      responseStatus: 0
    };
  }

  handleSubmit = async e => {
    e.preventDefault();
    const response = await fetch("/api/killme", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ post: this.state.post })
    });

    const body = await response.text();

    this.setState({ responseStatus: response.status });
    console.log(response);
  };

  renderDoge = () => {
    if (this.state.responseStatus === 200 || this.state.responseStatus === 0) {
      return <img src={happyDoge} className="doge" alt="img" />;
    }
    return <img src={sadDoge} className="doge" alt="img" />;
  };

  renderInfoMessage = () => {
    if (this.state.responseStatus === 200) {
      return "Your request hit a healthy instance! :)";
    } else if (this.state.responseStatus === 505) {
      return "Your request hit a broken instance! 👻";
    } else if (this.state.responseStatus === 500) {
      return "The server is down. Did you restart the server?";
    }
    return "";
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <span>DevOps Sample App</span>
          {this.renderDoge()}
          <div>
            <button onClick={this.handleSubmit}>Click me for a fresh doge pic</button>
          </div>
          <div>{this.renderInfoMessage()}</div>
        </header>
      </div>
    );
  }
}

export default App;
