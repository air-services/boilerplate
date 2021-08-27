import React, { useCallback, useEffect, useState } from 'react';
import rest from 'services/api/rest';
import { v4 } from 'uuid';
import { Application } from 'modules/constructor/applications/constructorModels';
import ConstructorApplicationView from 'modules/constructor/applications/ApplicationItemView';
import {
  NotificationStyle,
  useNotificationsContext,
} from 'providers/NotificationsContextProvider';
import Button from 'components/ui/Button/Button';
import { serializeToCamel } from 'services/api/serializers';

const defaultTemplateValues = () => ({
  name: `new app ${v4()}`,
  tableName: `table ${v4()}`,
  description: 'template description',
  fields: [
    { name: 'id', description: 'index', data_type_id: 1, foreign_key_id: null },
  ],
});

const ApplicationList = () => {
  const { showNotification } = useNotificationsContext();
  const [applications, setApplications] = useState({
    isLoaded: false,
    items: [],
  });

  const [dataTypes, setDataTypes] = useState({
    isLoaded: false,
    items: [],
    cache: {},
  });

  const [fields, setFields] = useState({
    isLoaded: false,
    items: [],
    cache: {},
  });

  const loadApplications = useCallback(() => {
    rest.api.applications.getList().then((response) => {
      setApplications((prevValue) => ({
        isLoaded: true,
        items: response.data.items.map((application: any) => {
          return serializeToCamel(application);
        }),
      }));
    });
  }, []);

  const addApplication = useCallback(() => {
    rest.api.applications
      .createItem(defaultTemplateValues())
      .then((response) => {
        showNotification(
          {
            title: 'success',
            content: `success create ${response.data.name} application`,
            style: NotificationStyle.success,
          },
          null
        );
        loadApplications();
      })
      .catch(() => {
        showNotification(
          {
            title: 'error',
            content: 'Create template error',
            style: NotificationStyle.danger,
          },
          null
        );
      });
  }, []);

  const removeApplication = useCallback((id) => {
    rest.api.applications
      .removeItem(String(id))
      .then(() => {
        showNotification(
          {
            title: 'Успех',
            content: 'Шаблон удален',
            style: NotificationStyle.success,
          },
          null
        );
        loadApplications();
      })
      .catch(() => {
        showNotification(
          {
            title: 'Ошибка',
            content: 'Невозможно удалить шаблон',
            style: NotificationStyle.danger,
          },
          null
        );
      });
  }, []);

  useEffect(() => {
    rest.api.dataTypes
      .getList()
      .then((response) => {
        setDataTypes({
          isLoaded: true,
          items: response.data.items,
          cache: response.data.items.reduce(
            (cache: any, item: any) => ({ ...cache, [item.id]: item }),
            {}
          ),
        });
      })
      .then(() => {
        loadApplications();
      });

    rest.api.fields.getList().then((response) => {
      setFields({
        isLoaded: true,
        items: response.data.items,
        cache: response.data.items.reduce(
          (cache: any, item: any) => ({ ...cache, [item.id]: item }),
          {}
        ),
      });
    });
  }, []);

  return (
    <div className={'constructor'}>
      <h1 className="text-2xl">Applications constructor</h1>
      {applications.isLoaded &&
        applications.items.map((application: Application) => {
          return (
            <ConstructorApplicationView
              key={application.id}
              application={application}
              dataTypes={dataTypes}
              fieldsCache={fields.cache}
              removeApplication={removeApplication}
            />
          );
        })}
      <div className="my-10">
        <Button
          title="Add application"
          onClickHandler={addApplication}
          buttonStyle={'success'}
        />
      </div>
    </div>
  );
};

export default ApplicationList;
