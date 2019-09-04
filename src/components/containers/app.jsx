import React from "react";
import "./../../assets/css/app.css";
import NavBar from "../presentational/navbar.jsx";
import MainPage from "./mainpage.jsx";
import TitleBar from "../presentational/titlebar.jsx";
import { BrowserRouter as Router, Route } from "react-router-dom";
import LandingPage from "../presentational/landingpage.jsx";

const App = () => (
  <div>
    <Router>
      <div className="app">
        <TitleBar />
        <NavBar />
        <Route path="/" exact component={LandingPage} />
        <Route path="/InputPage" exact component={MainPage} />
      </div>
    </Router>
  </div>
);

export default App;
