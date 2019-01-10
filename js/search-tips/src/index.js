import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import store from './store';

import SearchContainer from './containers/search';

render(
  <Provider store={store}>
    <SearchContainer />
  </Provider>,
  document.getElementById('search-page')
);
