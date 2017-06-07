import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route } from 'react-router';
import { Provider } from 'react-redux';

import store, { history } from './store';
import App from './App';

const router = (
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App} />
    </Router>
  </Provider>
);

ReactDOM.render(
  router,
  document.getElementById('root'),
);
