import './index.css';

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';

import AppContextProvider from './providers/AppContextProvider';
import NotificationsContextProvider from 'providers/NotificationsContextProvider';

import NavBar from 'components/NavBar';
import SignUpPage from 'pages/SignUp';
import LogInPage from 'pages/LogIn';
import StartPage from 'pages/Start';
import UserListPage from 'pages/users/UserListPage';
import UserEditPage from 'pages/users/UserEditPage';
import RoleListPage from 'pages/roles/RoleListPage';
import AccountSettingsPage from 'pages/AccountSettingsPage';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <AppContextProvider>
        <NotificationsContextProvider>
          <NavBar />
          <Switch>
            <Route path="/signup" component={SignUpPage} />
            <Route path="/login" component={LogInPage} />
            <Route path="/users/:id" component={UserEditPage} />
            <Route path="/users" component={UserListPage} />
            <Route path="/roles" component={RoleListPage} />
            <Route path="/account/settings" component={AccountSettingsPage} />
            <Route path="/" component={StartPage} />
          </Switch>
        </NotificationsContextProvider>
      </AppContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
