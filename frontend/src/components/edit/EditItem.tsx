import React, { useEffect, useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';

import TextInput from 'components/form/TextInput/TextInput';
import CheckBoxInput from 'components/form/CheckboxInput/CheckBoxInput';
import Button from 'components/ui/Button';
import {
  excludeKeys,
  serializeToCamel,
  serializeToSnake,
} from 'services/api/serializers';
import { useNotificationsContext } from 'providers/NotificationsContextProvider';
import { RestModelApi } from '../../services/api/rest';

type FormRender = 'TextInput' | 'CheckBoxInput';

const FieldRenderMap = {
  TextInput: TextInput,
  CheckBoxInput: CheckBoxInput,
};

export interface FormConfigField {
  id: string;
  label: string;
  placeholder: string;
  render: FormRender;
}


export interface EditItemFormConfig {
  title: string;
  api: RestModelApi;
  fields: any[];
  serialize: (data: any) => any;
  submitLabel: string;
  defaultState: () => any;
}

const EditItemForm = ({ item, formConfig }: { item: any, formConfig: EditItemFormConfig }) => {
  const { showNotification } = useNotificationsContext();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({ defaultValues: item });
  const onFormSubmit = useCallback((data) => {
    return formConfig.api
      .patchItem(data.id, formConfig.serialize(data))
      .then((response: any) => {
        showNotification(
          { title: 'Успех', content: 'Обновление прошло успешно' },
          null
        );
      });
  }, []);
  return (
    <div className="p-20">
      <h1 className="pb-10 text-2xl">{formConfig.title}</h1>
      <form className="grid grid-cols-6" onSubmit={handleSubmit(onFormSubmit)}>
        <div className="col-span-4">
          {formConfig.fields.map((field: FormConfigField) => {
            const FieldRenderComponent = FieldRenderMap[field.render];
            return (
              <FieldRenderComponent
                field={field}
                register={register}
                key={field.id}
              />
            );
          })}
          <div className="form-buttons">
            <Button
              isSubmitting={isSubmitting}
              title={formConfig.submitLabel}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

const EditItem = ({ id, formConfig }: { id: string, formConfig: EditItemFormConfig }) => {
  const [item, setItem] = useState(formConfig.defaultState());

  useEffect(() => {
    formConfig.api.getItem(id).then((response: any) => {
      setItem({ isLoaded: true, data: serializeToCamel(response.data) });
    });
  }, [id]);

  return item.isLoaded ? <EditItemForm item={item.data} formConfig={formConfig} /> : null;
};

export default EditItem;
