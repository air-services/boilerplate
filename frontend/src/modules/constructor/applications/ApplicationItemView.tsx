import {
  DataType,
  Application,
  ApplicationField,
} from 'modules/constructor/applications/constructorModels';
import { FormProvider, useFieldArray, useForm } from 'react-hook-form';
import rest from 'services/api/rest';
import constructorApi from 'services/api/constructor';

import constructorStyle from 'modules/constructor/applications/ApplicationList.module.scss';
import ApplicationFieldView from 'modules/constructor/applications/ApplicationFieldView';
import Button from 'components/ui/Button/Button';
import React, { useCallback } from 'react';
import {
  NotificationStyle,
  useNotificationsContext,
} from 'providers/NotificationsContextProvider';
import { serializeToSnake } from 'services/api/serializers';

const defaultFieldValues = () => ({
  name: 'name',
  description: 'description',
  size: 8,
  dataTypeId: 1,
});

const ApplicationItemView = ({
  application,
  dataTypes,
  fieldsCache,
  removeApplication,
}: {
  application: Application;
  dataTypes: { items: DataType[]; cache: { [id: string]: DataType } };
  fieldsCache: any;
  removeApplication(id: string): void;
}) => {
  const methods = useForm({ defaultValues: application });
  const { showNotification } = useNotificationsContext();

  const onSubmit = methods.handleSubmit((data) => {
    rest.api.applications
      .patchItem(String(application.id), serializeToSnake(data))
      .then((response) => {
        showNotification(
          {
            title: 'Успех',
            content: 'Обновление прошло успешно',
            style: NotificationStyle.success,
          },
          null
        );
      })
      .catch(() => {
        showNotification(
          {
            title: 'Ошибка',
            content: 'Что-то пошло не так',
            style: NotificationStyle.danger,
          },
          null
        );
      });
  });

  const onRemoveApplicationHandler = useCallback(() => {
    removeApplication(String(application.id));
  }, []);

  const generateApplication = useCallback(() => {
    constructorApi
      .generateApplicationFiles(String(application.id))
      .then(() => {
        showNotification(
          {
            title: 'Успех',
            content: 'Файлы сгенерированы',
            style: NotificationStyle.success,
          },
          null
        );
      })
      .catch((e) => {
        showNotification(
          {
            title: 'Ошибка',
            content: e.response.data.detail,
            style: NotificationStyle.danger,
          },
          null
        );
      });
  }, []);

  const { fields, append, remove } = useFieldArray({
    control: methods.control,
    name: 'fields',
  });

  const addField = () => {
    append(defaultFieldValues());
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={onSubmit}>
        <div className="w-full bg-white shadow-md px-4 pt-0 mt-8">
          <nav className="flex flex-col sm:flex-row mb-8 -ml-4">
            <a className="text-gray-600 py-4 px-6 block hover:text-blue-500 focus:outline-none text-blue-500 border-b-2 font-medium border-blue-500">
              Model
            </a>
            <a className="text-gray-600 py-4 px-6 block hover:text-blue-500 focus:outline-none">
              Serializer
            </a>
            <a className="text-gray-600 py-4 px-6 block hover:text-blue-500 focus:outline-none">
              Relations
            </a>
            <a className="text-gray-600 py-4 px-6 block hover:text-blue-500 focus:outline-none">
              Router
            </a>
          </nav>

          <div className={constructorStyle.titleWrapper}>
            <h2 className="text-xl">
              <span>Application name:</span>
              <input
                className={constructorStyle.appNameInput}
                {...methods.register('name')}
                defaultValue={application.name}
              />
            </h2>
          </div>

          <h3 className={constructorStyle.tableNameCaption}>
            <span>Table name:</span>
            <input
              className={constructorStyle.tableNameInput}
              {...methods.register('tableName')}
              defaultValue={application.tableName}
            />
          </h3>

          <div className="p-4">
            <table className={constructorStyle.table}>
              <thead>
                <tr>
                  <th className={constructorStyle.tableHeadItem}>name</th>
                  <th className={constructorStyle.tableHeadItem}>
                    description
                  </th>
                  <th className={constructorStyle.tableHeadItem}>data type</th>
                  <th className={constructorStyle.tableHeadItem}>foreign</th>
                  <th className={constructorStyle.tableHeadItem}>size</th>
                  <th className={constructorStyle.tableHeadItem}>
                    primary key
                  </th>
                  <th className={constructorStyle.tableHeadItem}>index</th>
                  <th className={constructorStyle.tableHeadItem}>actions</th>
                </tr>
              </thead>
              <tbody>
                {fields.map((field: ApplicationField, index) => {
                  return (
                    <ApplicationFieldView
                      field={field}
                      dataTypes={dataTypes}
                      fieldsCache={fieldsCache}
                      key={field.id}
                      index={index}
                      remove={remove}
                    />
                  );
                })}
              </tbody>
            </table>
            <div className={constructorStyle.tableButtons}>
              <Button title="Update" />
              <span className="pl-4">
                <Button
                  buttonStyle="success"
                  title="Add field"
                  buttonType="button"
                  onClickHandler={addField}
                />
              </span>
              <span className="pl-4">
                <Button
                  buttonStyle="danger"
                  title="Remove"
                  buttonType="button"
                  onClickHandler={onRemoveApplicationHandler}
                />
              </span>
              <span className={constructorStyle.generateButton}>
                <Button
                  title={'Generate'}
                  buttonType={'button'}
                  onClickHandler={generateApplication}
                />
              </span>
            </div>
          </div>
        </div>
      </form>
    </FormProvider>
  );
};

export default ApplicationItemView;
