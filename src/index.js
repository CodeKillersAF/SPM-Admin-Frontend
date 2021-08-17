import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import App from './App';

axios.defaults.baseURL = 'http://localhost:8000/api/admin';
axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

