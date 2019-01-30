import React from 'react';
import './../../assets/css/app.css';
import NavBar from './navbar.jsx'
import MainPage from './../containers/maingpage.jsx'
import TitleBar from './titlebar.jsx'



const App = () => (
    <div>
        <div className="app container-fluid">
            <TitleBar />
            <NavBar />
            <MainPage />
        </div>
    </div>
);

export default App;
