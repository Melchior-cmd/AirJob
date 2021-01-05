import React from 'react';

import './App.css';

import logo from './assets/logo@2x.png';

import Routes from './routes';

function App() {
  return (
    <div className="container">
       <img src={logo} alt="AirCnc"/>     

       <div className="content">
         <Routes />
       </div>   
    </div>
  );
}

export default App;
