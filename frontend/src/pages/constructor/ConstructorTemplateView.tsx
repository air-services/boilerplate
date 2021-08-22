import {
  DataType,
  Template,
  TemplateField,
} from 'pages/constructor/constructorModels';
import { FormProvider, useFieldArray, useForm } from 'react-hook-form';
import rest from 'services/api/rest';
import constructorApi from 'services/api/constructor';

import constructorStyle from 'pages/constructor/ConstructorPage.module.scss';
import ConstructorTemplateField from 'pages/constructor/ConstructorTemplateField';
import Button, { ButtonStyle } from 'components/ui/Button/Button';
import React, { useCallback } from 'react';
import {
  NotificationStyle,
  useNotificationsContext,
} from 'providers/NotificationsContextProvider';

const defaultFieldValues = () => ({
  name: 'name',
  description: 'description',
  size: 8,
  data_type_id: 1,
});

const TemplateView = ({
  template,
  dataTypes,
  removeTemplate,
}: {
  template: Template;
  dataTypes: { items: DataType[]; cache: { [id: string]: DataType } };
  removeTemplate(id: string): void;
}) => {
  const methods = useForm({ defaultValues: template });
  const { showNotification } = useNotificationsContext();

  const onSubmit = methods.handleSubmit((data) => {
    rest.api.templates
      .patchItem(String(template.id), data)
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

  const onRemoveTemplateHandler = useCallback(() => {
    removeTemplate(String(template.id));
  }, []);

  const generateTemplate = useCallback(() => {
    constructorApi
      .generateTemplate(String(template.id))
      .then(() => {
        showNotification(
          {
            title: 'Успех',
            content: 'Модель сгенерирована',
            style: NotificationStyle.success,
          },
          null
        );
      })
      .catch(() => {
        showNotification(
          {
            title: 'Ошибка',
            content: 'Не удалось сгененировать миграцию',
            style: NotificationStyle.danger,
          },
          null
        );
      });
  }, []);

  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
    {
      control: methods.control,
      name: 'fields',
    }
  );

  const addField = () => {
    append(defaultFieldValues());
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={onSubmit}>
        <div className="w-full bg-white rounded-xl shadow-md p-4 mt-4">
          <div className={constructorStyle.titleWrapper}>
            <h2 className="text-xl">
              <input
                className={constructorStyle.appNameInput}
                {...methods.register('name')}
                defaultValue={template.name}
              />
            </h2>
          </div>
          <div className="p-4">
            <table className={constructorStyle.table}>
              <thead>
                <tr>
                  <th className={constructorStyle.tableHeadItem}>name</th>
                  <th className={constructorStyle.tableHeadItem}>
                    description
                  </th>
                  <th className={constructorStyle.tableHeadItem}>data type</th>
                  <th className={constructorStyle.tableHeadItem}>size</th>
                  <th className={constructorStyle.tableHeadItem}>actions</th>
                </tr>
              </thead>
              <tbody>
                {fields.map((field: TemplateField, index) => {
                  return (
                    <ConstructorTemplateField
                      field={field}
                      dataTypes={dataTypes}
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
                  onClickHandler={onRemoveTemplateHandler}
                />
              </span>
              <span className={constructorStyle.generateButton}>
                <Button
                  title={'Generate'}
                  buttonType={'button'}
                  onClickHandler={generateTemplate}
                />
              </span>
            </div>
          </div>
        </div>
      </form>
    </FormProvider>
  );
};

export default TemplateView;
