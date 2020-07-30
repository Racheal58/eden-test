import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

import 'semantic-ui-css/semantic.min.css';

import Router from './Router';
import store from './store/store';

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <Router />
      <ToastContainer />
    </Provider>
  </BrowserRouter>,
  document.getElementById('app'),
);
