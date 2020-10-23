import React, { useState } from 'react';
import logo from './logo.svg';
import Menu from './pages/Menu'
import Delivery from './pages/Delivery'
import Payment from './pages/Payment'
import {
  HashRouter,
  Switch,
  Route
} from "react-router-dom";

import './App.css';

function App() {

  const [loadingPage, setLoading] = useState(true);
  const [fadeLogo, setFade] = useState(false);

  setTimeout(() => setLoading(false), 1000);
  setTimeout(() => setFade(true), 500);

  return (
    <div className="App">
      <HashRouter>
        {/* <Switch> */}
        <Route exact path="/delivery" component={Delivery} />
        <Route exact path="/payment" component={Payment} />
        <Route exact path="/">
          {loadingPage ?
            <header className="App-header">
              <img src={logo} className={fadeLogo ? "App-logo-fade" : "App-logo"} alt="logo" />
            </header>
            :
            <Menu />
          }
        </Route>
        {/* </Switch> */}
      </HashRouter>
    </div>
  )
}

export default App;
