import './index.css';

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';

import NavBar from './components/NavBar';
import SignUpPage from './pages/SignUp';
import LogInPage from './pages/LogIn';
import StartPage from './pages/Start';
import UsersPage from './pages/Users';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route path="/signup" component={SignUpPage} />
        <Route path="/login" component={LogInPage} />
        <Route path="/users" component={UsersPage} />
        <Route path="/" component={StartPage} />
      </Switch>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
