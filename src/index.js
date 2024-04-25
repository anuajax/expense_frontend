import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';

axios.defaults.baseURL = 'https://expenses-kqvyo0wo5-anurags-projects-14450284.vercel.app';
axios.defaults.withCredentials=true;
// axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('authToken');
// const api = axios.create({
//   baseURL: 'http://localhost:5000/',
//   headers: {'Content-Type': 'application/json'}
// });
// axios.interceptors.response.use(response => response, async error => {
//   const originalRequest = error.config;
//   if (error.response.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;
//       try {
//           const refreshToken = localStorage.getItem('refreshToken'); // Assuming you store refreshToken in localStorage
//           const data = await refreshTokenCall(refreshToken); // Your function to call the server's refresh endpoint
//           localStorage.setItem('authToken', data.authToken); // Update the new access token
//           axios.defaults.headers.common['Authorization'] = `Bearer ${data.authToken}`;
//           return api(originalRequest); // Retry the original request with the new token
//       } catch (refreshError) {
//           // Handle failed refresh here (e.g., redirect to login)
//       }
//   }
//   return Promise.reject(error);
// });
// async function refreshTokenCall(refreshToken) {
//   const response = await axios.post('/auth/refresh', { refreshToken });
//   return response.data;
// }
axios.interceptors.response.use(
  response => response,
  async error => {
      const originalRequest = error.config;
      console.log(error);
      if (error.response.status === 401 && !originalRequest._retry && error.response.data.error === 'Token error') {
          //localStorage.removeItem('authToken'); // remove the token from storage
          localStorage.clear();
          window.location.href = '/login'; // redirect to login page
      }
      return Promise.reject(error);
  }
);
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
    <App />
    </BrowserRouter>
    
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
