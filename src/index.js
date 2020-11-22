import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import MyRouter from './router/myRouter';
import Main from './pages/main/main';
import Login from './pages/login/login';
import { reqAddVisits } from './api/api';

reqAddVisits();

ReactDOM.render(
  <Provider store={store}>
    <HashRouter>
      <Switch>
        <Route path = '/login' component = {Login} />
        <MyRouter path = '/main' component = {Main} />
        <MyRouter component = {Main} />
      </Switch>
    </HashRouter>
  </Provider>,
  document.getElementById('root')
);

reportWebVitals();
