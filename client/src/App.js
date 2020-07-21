import React from 'react';
import './App.css';
import AuthState from './context/auth/AuthState';
import setAuthToken from '../src/utils/setAuthToken';
import AlertState from './context/alert/AlertState';
import Alerts from './components/layout/Alerts';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  return (
    <AuthState>
      <AlertState>
        <div className='container'>
          <Alerts />
        </div>
      </AlertState>
    </AuthState>
  );
};

export default App;
