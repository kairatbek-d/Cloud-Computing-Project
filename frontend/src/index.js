import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import client from './apolloClient';
import { ApolloProvider } from '@apollo/react-hooks';
import { BrowserRouter } from 'react-router-dom';
import {AuthProvider} from './context/authContext'

//React app needs access to ...
//Client
//Authorization Conext
//Browser Router (react router) for login/ register

ReactDOM.render(
  <AuthProvider>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </BrowserRouter>
    </ApolloProvider>
  </AuthProvider>,
  document.getElementById('root')
);

