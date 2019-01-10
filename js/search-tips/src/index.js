import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store';

const store = configureStore();

import SearchContainer from './containers/search';

render(
  <Provider store={store}>
    <SearchContainer />
  </Provider>,
  document.getElementById('search-page')
);
