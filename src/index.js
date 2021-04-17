import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Signup from './Signup';
import Signin from './Signin';
import Landing from './Landing';
import NewBoard from './NewBoard';
import Dashboard from './Dashboard';

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={App} />
      <Route path="/signin" component={Signin} />
      <Route path="/signup" component={Signup} />
      <Route path="/newboard" component={NewBoard} />
      <Route path="/dashboard/:id" component={Dashboard} />
    </Switch>
  </BrowserRouter>,
  document.getElementById('root')
);
