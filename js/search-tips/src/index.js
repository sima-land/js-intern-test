import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import store from './redux/store/store';

import SearchContainer from './containers/search-container';

import './styles/index.css'

render(
  <Provider store={store}>
    <SearchContainer />
  </Provider>,
  document.getElementById('search-page')
);
