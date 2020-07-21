import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import AuthState from './context/auth/AuthState';
import setAuthToken from '../src/utils/setAuthToken';
import AlertState from './context/alert/AlertState';
import Alerts from './components/layout/Alerts';
import Navbar from './components/layout/Navbar';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  return (
    <AuthState>
      <AlertState>
        <Router>
          <Fragment>
            <Navbar />
            <div className='container'>
              <Alerts />
            </div>
          </Fragment>
        </Router>
      </AlertState>
    </AuthState>
  );
};

export default App;
