import './index.css';

import { library } from '@fortawesome/fontawesome-svg-core';
import * as Icons from '@fortawesome/free-solid-svg-icons';
import { faAd } from '@fortawesome/free-solid-svg-icons';

const IconsModule: any = Icons;

const iconList = Object.keys(IconsModule)
  .filter((key) => key !== 'fas' && key !== 'prefix')
  .map((icon) => IconsModule[icon]);

library.add(...iconList);

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

// constructor
import ApplicationListPage from 'pages/constructor/applications/ApplicationListPage';
import ApplicationItemPage from 'pages/constructor/applications/ApplicationItemPage';
import ApplicationDataListPage from 'pages/constructor/data/ApplicationDataListPage';
import ApplicationDataCreatePage from 'pages/constructor/data/ApplicationDataCreatePage';
import ApplicationDataEditPage from 'pages/constructor/data/ApplicationDataEditPage';

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

              <Route path="//create" component={DashboardCreatePage} />
              <Route path="/dashboards/:id" component={DashboardEditPage} />
              <Route path="/dashboards" component={DashboardListPage} />

              <Route path="/" component={StartPage} />
            </Switch>
          </Page>
        </NotificationsContextProvider>
      </AppContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
