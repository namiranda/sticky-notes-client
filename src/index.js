import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import axios from 'axios';

import Signup from './Signup';
import Signin from './Signin';
import Logout from './Logout';
import NewBoard from './NewBoard';
import Dashboard from './Dashboard';
import Workspace from './Workspace';

axios.defaults.baseURL = 'https://topiksapi.herokuapp.com';

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={App} />
      <Route path="/signin" component={Signin} />
      <Route path="/signup" component={Signup} />
      <Route path="/newboard" component={NewBoard} />
      <Route path="/dashboard/:id" component={Dashboard} />
      <Route path="/:id/workspaces/:ws_id" component={Workspace} />
      <Route path="/signout" component={Logout} />
    </Switch>
  </BrowserRouter>,
  document.getElementById('root')
);
