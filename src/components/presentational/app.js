import React from "react";
import "./../../assets/css/app.css";
import NavBar from "./navbar.jsx";
import MainPage from "./../containers/mainpage.jsx";
import TitleBar from "./titlebar.jsx";

const App = () => (
  <div>
    <div className="app">
      <TitleBar />
      <NavBar />
      <MainPage />
    </div>
  </div>
);

export default App;
