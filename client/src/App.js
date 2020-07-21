import React from 'react';
import './App.css';
import AuthState from './context/auth/AuthState';
import setAuthToken from '../src/utils/setAuthToken';
import AlertState from './context/alert/AlertState';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  return (
    <AuthState>
      <AlertState>
        <div className='container'> Hello World </div>
      </AlertState>
    </AuthState>
  );
};

export default App;
