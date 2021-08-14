import './index.css';

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Page from 'components/ui/Page/Page';

import AppContextProvider from './providers/AppContextProvider';
import NotificationsContextProvider from 'providers/NotificationsContextProvider';

import Navigation from 'components/common/Navigation/Navigation';
import SignUpPage from 'pages/SignUp';
import LogInPage from 'pages/LogIn';
import StartPage from 'pages/Start';
import AccountSettingsPage from 'pages/AccountSettingsPage';

// modules
import UserListPage from 'pages/users/UserListPage';
import UserEditPage from 'pages/users/UserEditPage';
import UserCreatePage from 'pages/users/UserCreatePage';

import RoleListPage from 'pages/roles/RoleListPage';
import RoleEditPage from 'modules/roles/RoleEdit';
import RoleCreatePage from 'pages/roles/RoleCreatePage';

import ProjectListPage from 'pages/projects/ProjectListPage';
import ProjectEditPage from 'pages/projects/ProjectEditPage';
import ProjectCreatePage from 'pages/projects/ProjectCreatePage';

import DashboardListPage from 'pages/dashboards/DashboardListPage';
import DashboardEditPage from 'pages/dashboards/DashboardEditPage';
import DashboardCreatePage from 'pages/dashboards/DashboardCreatePage';

import AdminMainPage from 'pages/admin/AdminMainPage';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <AppContextProvider>
        <NotificationsContextProvider>
          <Navigation />
          <Page>
            <Switch>
              <Route path="/admin" component={AdminMainPage} />
              <Route path="/signup" component={SignUpPage} />
              <Route path="/login" component={LogInPage} />

              <Route path="/users/create" component={UserCreatePage} />
              <Route path="/users/:id" component={UserEditPage} />
              <Route path="/users" component={UserListPage} />

              <Route path="/roles/create" component={RoleCreatePage} />
              <Route path="/roles/:id" component={RoleEditPage} />
              <Route path="/roles" component={RoleListPage} />

              <Route path="/projects/create" component={ProjectCreatePage} />
              <Route path="/projects/:id" component={ProjectEditPage} />
              <Route path="/projects" component={ProjectListPage} />

              <Route
                path="/dashboards/create"
                component={DashboardCreatePage}
              />
              <Route path="/dashboards/:id" component={DashboardEditPage} />
              <Route path="/dashboards" component={DashboardListPage} />

              <Route path="/account/settings" component={AccountSettingsPage} />
              <Route path="/" component={StartPage} />
            </Switch>
          </Page>
        </NotificationsContextProvider>
      </AppContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
