import React, { useState } from 'react';
import logo from './logo.svg';
import Menu from './pages/Menu'
import Delivery from './pages/Delivery'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import './App.css';

function App() {

  const [loadingPage, setLoading] = useState(false);
  const [fadeLogo, setFade] = useState(false);

  setTimeout(() => setLoading(false), 4000);
  setTimeout(() => setFade(true), 3000);

  return (
    <div className="App">

      <Switch>
        <Route path="/delivery">
          <Delivery />
        </Route>
        <Route path="/">
          {loadingPage ?
            <header className="App-header">
              <img src={logo} className={fadeLogo ? "App-logo-fade" : "App-logo"} alt="logo" />
            </header>
            :
            <Menu />
          }
        </Route>
      </Switch>
    </div>
  )
}

export default App;
