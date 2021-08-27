import React, { useCallback, useEffect, useState } from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { Application } from 'modules/constructor/applications/constructorModels';
import ApplicationItem from 'modules/constructor/applications/ApplicationItem/ApplicationItem';
import restApi from 'services/api/rest';
import rest from 'services/api/rest';
import { serializeToCamel } from 'services/api/serializers';
import {
  NotificationStyle,
  useNotificationsContext,
} from 'providers/NotificationsContextProvider';

interface ApplicationRouteParams {
  params: {
    id: string;
  };
}

const defaultApplicationState = (): Application => ({
  id: 0,
  name: '',
  tableName: '',
  fields: [],
});

const cacheValues = (items: any[]) =>
  items.reduce((cache: any, item: any) => ({ ...cache, [item.id]: item }), {});

const ApplicationItemPage = () => {
  const { showNotification } = useNotificationsContext();
  const history = useHistory();

  const routerParams: ApplicationRouteParams = useRouteMatch();
  const [application, setApplication] = useState(defaultApplicationState());
  const [dataTypesCache, setDataTypesCache] = useState({
    isLoaded: false,
    values: {},
  });
  const [fieldsCache, setFieldsCache] = useState({
    isLoaded: false,
    values: {},
  });

  useEffect(() => {
    rest.api.dataTypes.getList().then((response) =>
      setDataTypesCache({
        isLoaded: true,
        values: cacheValues(response.data.items),
      })
    );

    rest.api.fields.getList().then((response) => {
      setFieldsCache({
        isLoaded: true,
        values: cacheValues(response.data.items),
      });
    });

    restApi.api.applications
      .getItem(routerParams.params.id)
      .then((response) => {
        setApplication(serializeToCamel(response.data));
      });
  }, [routerParams]);

  const isApplicationLoaded =
    application.id && fieldsCache.isLoaded && dataTypesCache.isLoaded;

  const remove = useCallback(() => {
    rest.api.applications
      .removeItem(String(application.id))
      .then(() => {
        showNotification(
          {
            title: 'Успех',
            content: 'Шаблон удален',
            style: NotificationStyle.success,
          },
          null
        );
        history.push('/');
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
  }, [application.id]);

  return isApplicationLoaded ? (
    <ApplicationItem
      remove={remove}
      application={application}
      fieldsCache={fieldsCache.values}
      dataTypesCache={dataTypesCache.values}
    />
  ) : null;
};

export default ApplicationItemPage;
