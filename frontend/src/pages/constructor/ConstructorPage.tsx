import React, { useCallback, useEffect, useState } from 'react';
import rest from 'services/api/rest';
import { v4 } from 'uuid';
import { Template } from 'pages/constructor/constructorModels';
import ConstructorTemplateView from 'pages/constructor/ConstructorApplicationView';
import {
  NotificationStyle,
  useNotificationsContext,
} from 'providers/NotificationsContextProvider';
import Button from 'components/ui/Button/Button';

const defaultTemplateValues = () => ({
  name: `new app ${v4()}`,
  description: 'template description',
  fields: [
    { name: 'id', description: 'index', data_type_id: 1, foreign_key_id: null },
  ],
});

const ConstructorPage = () => {
  const { showNotification } = useNotificationsContext();
  const [templates, setTemplates] = useState({ isLoaded: false, items: [] });
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

  const loadTemplates = useCallback(() => {
    rest.api.templates.getList().then((response) => {
      setTemplates((prevValue) => ({
        isLoaded: true,
        items: response.data.items,
      }));
    });
  }, []);

  const addTemplate = useCallback(() => {
    rest.api.templates
      .createItem(defaultTemplateValues())
      .then((response) => {
        showNotification(
          {
            title: 'success',
            content: `success create ${response.data.name} template`,
            style: NotificationStyle.success,
          },
          null
        );
        loadTemplates();
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

  const removeTemplate = useCallback((id) => {
    rest.api.templates
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
        loadTemplates();
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
        loadTemplates();
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
      <h1 className="text-2xl">App constructor</h1>
      {templates.isLoaded &&
        templates.items.map((template: Template) => {
          return (
            <ConstructorTemplateView
              key={template.id}
              template={template}
              dataTypes={dataTypes}
              fieldsCache={fields.cache}
              removeTemplate={removeTemplate}
            />
          );
        })}
      <div className="my-10">
        <Button
          title="Add template"
          onClickHandler={addTemplate}
          buttonStyle={'success'}
        />
      </div>
    </div>
  );
};

export default ConstructorPage;
