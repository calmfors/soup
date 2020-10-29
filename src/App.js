import React, { useState } from 'react';
import logo from './logo.svg';
import Menu from './pages/Menu'
import Delivery from './pages/Delivery'
import Payment from './pages/Payment'
import {
  BrowserRouter,
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
      <BrowserRouter basename='/soup/'>
        <Switch>
          <Route path="/delivery" component={Delivery} />
          <Route path="/payment" component={Payment} />
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
      </BrowserRouter>
    </div>
  )
}

export default App;
