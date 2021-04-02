import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import styled from "styled-components";
// Pages
import Join from "./pages/Join";
import Chatroom from "./pages/Chatroom";

function App() {
  return (
    <Router>
      <Route path="/" exact component={Join} />
      <Route path="/chatroom" component={Chatroom} />
    </Router>
  );
}

export default App;

// TODO: add a dark mode setting
