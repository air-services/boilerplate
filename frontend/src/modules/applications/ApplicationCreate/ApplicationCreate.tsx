import React, { useCallback } from 'react';
import Tabs, { useTabs } from 'components/ui/Tabs/Tabs';
import { FormProvider, useForm } from 'react-hook-form';

import ApplicationConfig from './ApplicationConfig/ApplicationConfig';
import ApplicationModules from './AppliationModules/ApplicationModules';

import applicationCreateStyle from './ApplicationCreate.module.scss';
import { Application } from 'modules/applications/ApplicationCreate/applicationModels';
import {
  NotificationStyle,
  useNotificationsContext,
} from 'providers/NotificationsContextProvider';
import constructorApi from 'services/api/constructor';

const tabs = ['Config', 'Modules'];

const applicationDefaultFormState = (): Application => ({
  name: 'Store',
  description: 'Web store',
  url: 'store',
  icon: {
    name: 'store',
    id: 827,
  },
  modules: [
    {
      name: 'categories',
      url: 'categories',
      api: 'categories',
      icon: {
        name: 'address-card',
        id: 3,
      },
    },
  ],
});

const ApplicationCreate = () => {
  const { showNotification } = useNotificationsContext();

  const { activeTab, setActiveTab } = useTabs(tabs);
  const methods = useForm({ defaultValues: applicationDefaultFormState() });
  const onSubmitFormHandler = useCallback(
    methods.handleSubmit((formData) => {
      constructorApi
        .createApplication({
          name: formData.name,
          url: formData.url,
          description: formData.description,
          icon_id: formData.icon.id,
          modules: formData.modules.map((module: any) => ({
            name: module.name,
            url: module.url,
            api: module.api,
            icon_id: module.icon.id,
          })),
        })
        .then((response) => {
          showNotification(
            {
              title: 'message',
              content: `<pre>${JSON.stringify(response.data, null, 2)}</pre>`,
              style: NotificationStyle.success,
            },
            null
          );
        })
        .catch(() => {
          showNotification(
            {
              title: 'Error',
              content: 'create application error',
              style: NotificationStyle.danger,
            },
            null
          );
        });
    }),
    []
  );
  const createAppTabs = ['Config', 'Modules'];

  return (
    <div className="my-10">
      <div className={applicationCreateStyle.wrapper}>
        <h1 className={applicationCreateStyle.title}>Create new application</h1>
        <FormProvider {...methods}>
          <form
            className={applicationCreateStyle.form}
            onSubmit={onSubmitFormHandler}>
            <div className="-ml-4">
              <Tabs
                tabs={createAppTabs}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              />
            </div>
            {activeTab === 'Config' && <ApplicationConfig />}
            {activeTab === 'Modules' && <ApplicationModules />}
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export default ApplicationCreate;
