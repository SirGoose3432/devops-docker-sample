import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      response: "",
      post: "",
      responseToPost: ""
    };
  }

  // componentDidMount() {
  //   this.callApi()
  //     .then(res => this.setState({ response: res.express }))
  //     .catch(err => console.log(err));
  // }

  // callApi = async () => {
  //   const response = await fetch("api/hello");
  //   const body = await response.json();
  //   if (response.status !== 200) throw Error(body.message);
  //   return body;
  // };

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

    this.setState({ responseToPost: body });
    console.log(response);
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <span>Sample App</span>
          <img src={logo} className="App-logo" alt="logo" />
          <div>
            <button onClick={this.handleSubmit}>Click me, I dare you</button>
          </div>
          <div>{this.state.responseToPost}</div>
        </header>
      </div>
    );
  }
}

export default App;
