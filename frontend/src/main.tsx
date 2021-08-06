import './index.css';

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import AppContextProvider from './providers/AppContextProvider';
import NotificationsContextProvider from 'providers/NotificationsContextProvider';

import NavBar from 'components/common/NavBar/NavBar';
import SignUpPage from 'pages/SignUp';
import LogInPage from 'pages/LogIn';
import StartPage from 'pages/Start';
import AccountSettingsPage from 'pages/AccountSettingsPage';

// modules
import UserListPage from 'pages/users/UserListPage';
import UserEditPage from 'pages/users/UserEditPage';
import RoleListPage from 'pages/roles/RoleListPage';
import RoleEditPage from 'pages/roles/RoleEditPage';
import ProjectListPage from 'pages/projects/ProjectListPage';
import ProjectEditPage from 'pages/projects/ProjectEditPage';
import DashboardListPage from 'pages/dashboards/DashboardListPage';
import DashboardEditPage from 'pages/dashboards/DashboardEditPage';

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
            <Route path="/roles/:id" component={RoleEditPage} />

            <Route path="/roles" component={RoleListPage} />
            <Route path="/projects/:id" component={ProjectEditPage} />
            <Route path="/projects" component={ProjectListPage} />
            <Route path="/dashboards/:id" component={DashboardEditPage} />
            <Route path="/dashboards" component={DashboardListPage} />

            <Route path="/account/settings" component={AccountSettingsPage} />
            <Route path="/" component={StartPage} />
          </Switch>
        </NotificationsContextProvider>
      </AppContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
