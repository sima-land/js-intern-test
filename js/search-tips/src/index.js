import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import store from './redux/store/store';

import SearchFormContainer from './containers/search-form-container';

render(
  <Provider store={store}>
    <SearchFormContainer />
  </Provider>,
  document.getElementById('search-page')
);
