import './index.css';

import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import {
  faCheckSquare,
  faCoffee,
  faUser,
  faKey,
  faDesktop,
  faInfo,
  faIdCard,
  faGreaterThan,
  faEdit,
  faTrashAlt,
} from '@fortawesome/free-solid-svg-icons';

library.add(
  fab,
  faCheckSquare,
  faCoffee,
  faUser,
  faKey,
  faDesktop,
  faInfo,
  faIdCard,
  faGreaterThan,
  faEdit,
  faTrashAlt
);

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import AppContextProvider from './providers/AppContextProvider';
import NotificationsContextProvider from 'providers/NotificationsContextProvider';

import Page from 'components/ui/Page/Page';
import Navigation from 'components/common/Navigation/Navigation';

import StartPage from 'pages/Start';

import SignUpPage from 'pages/account/AccountSignUpPage';
import LogInPage from 'pages/account/AccountLogInPage';

// rest
import UserListPage from 'pages/users/UserListPage';
import UserEditPage from 'pages/users/UserEditPage';
import UserCreatePage from 'pages/users/UserCreatePage';

import RoleListPage from 'pages/roles/RoleListPage';
import RoleEditPage from 'pages/roles/RoleEditPage';
import RoleCreatePage from 'pages/roles/RoleCreatePage';

import ProjectListPage from 'pages/projects/ProjectListPage';
import ProjectEditPage from 'pages/projects/ProjectEditPage';
import ProjectCreatePage from 'pages/projects/ProjectCreatePage';

import DashboardListPage from 'pages/dashboards/DashboardListPage';
import DashboardEditPage from 'pages/dashboards/DashboardEditPage';
import DashboardCreatePage from 'pages/dashboards/DashboardCreatePage';

import CardListPage from 'pages/statistic/cards/CardListPage';
import CardCreatePage from 'pages/statistic/cards/CardCreatePage';
import CardEditPage from 'pages/statistic/cards/CardEditPage';

import ConstructorPage from 'pages/constructor/ConstructorPage';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <AppContextProvider>
        <NotificationsContextProvider>
          <Navigation />
          <Page>
            <Switch>
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

              <Route path="/cards/create" component={CardCreatePage} />
              <Route path="/cards/:id" component={CardEditPage} />
              <Route path="/cards" component={CardListPage} />

              <Route
                path="/dashboards/create"
                component={DashboardCreatePage}
              />
              <Route path="/dashboards/:id" component={DashboardEditPage} />
              <Route path="/dashboards" component={DashboardListPage} />

              <Route path="/constructor" component={ConstructorPage} />

              <Route path="/" component={StartPage} />
            </Switch>
          </Page>
        </NotificationsContextProvider>
      </AppContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
