import React, { useCallback, useEffect } from 'react';
import { FormProvider, useFieldArray, useForm } from 'react-hook-form';
import {
  NotificationStyle,
  useNotificationsContext,
} from 'providers/NotificationsContextProvider';
import rest from 'services/api/rest';
import { serializeToSnake } from 'services/api/serializers';
import constructorStyle from 'modules/constructor/applications/ApplicationList.module.scss';
import {
  Application,
  ApplicationField,
  DataTypesCache,
  FieldsCache,
} from 'modules/constructor/applications/constructorModels';
import Button from 'components/ui/Button/Button';
import ApplicationItemTableField from 'modules/constructor/applications/ApplicationItem/ApplicationItemTableField';

const defaultFieldValues = () => ({
  name: 'name',
  description: 'description',
  size: 8,
  dataTypeId: 1,
});

const ApplicationItemTable = ({
  application,
  dataTypesCache,
  fieldsCache,
  remove,
}: {
  application: Application;
  dataTypesCache: DataTypesCache;
  fieldsCache: FieldsCache;
  remove(): void;
}) => {
  const methods = useForm({ defaultValues: application });

  useEffect(() => {
    methods.reset(application);
  }, [application]);

  const { showNotification } = useNotificationsContext();

  const onApplicationUpdateSubmit = methods.handleSubmit((data) => {
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

  const {
    fields,
    append,
    remove: removeField,
  } = useFieldArray({
    control: methods.control,
    name: 'fields',
  });

  const addField = useCallback(() => {
    append(defaultFieldValues());
  }, []);

  return (
    <FormProvider {...methods}>
      <form onSubmit={onApplicationUpdateSubmit}>
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
                <th className={constructorStyle.tableHeadItem}>description</th>
                <th className={constructorStyle.tableHeadItem}>data type</th>
                <th className={constructorStyle.tableHeadItem}>foreign</th>
                <th className={constructorStyle.tableHeadItem}>size</th>
                <th className={constructorStyle.tableHeadItem}>primary key</th>
                <th className={constructorStyle.tableHeadItem}>index</th>
                <th className={constructorStyle.tableHeadItem}>actions</th>
              </tr>
            </thead>
            <tbody>
              {fields.map((field: ApplicationField, index) => {
                return (
                  <ApplicationItemTableField
                    field={field}
                    dataTypesCache={dataTypesCache}
                    fieldsCache={fieldsCache}
                    key={field.id}
                    index={index}
                    remove={removeField}
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
                onClickHandler={remove}
                title="Remove"
                buttonType="button"
              />
            </span>
          </div>
        </div>
      </form>
    </FormProvider>
  );
};

export default ApplicationItemTable;
