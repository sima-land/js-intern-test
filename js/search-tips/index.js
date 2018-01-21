import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import 'babel-polyfill';
import store from './store/store';

import SearchContainer from './containers/search-container';

import 'bootstrap/dist/css/bootstrap.css';
import './styles/index.css'

render(
  <Provider store={store}>
    <SearchContainer />
  </Provider>,
  document.getElementById('search-page')
);
