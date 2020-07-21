import React from 'react';
import './App.css';
import AuthState from './context/auth/AuthState';
import setAuthToken from '../src/utils/setAuthToken';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  return (
    <AuthState>
      <div className='container'> Hello World </div>
    </AuthState>
  );
};

export default App;
