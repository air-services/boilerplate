import React, { useEffect, useState, useCallback } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { useHistory } from 'react-router-dom';

import TextInput from 'components/ui/form/TextInput/TextInput';
import CheckBoxInput from 'components/ui/form/CheckboxInput/CheckBoxInput';
import MultiSelectInput from 'components/ui/form/MultiSelectInput/MultiSelectInput';

import Button from 'components/ui/Button/Button';
import { serializeToCamel } from 'services/api/serializers';
import { useNotificationsContext } from 'providers/NotificationsContextProvider';
import { RestModelApi } from 'services/api/rest';
import Select from 'react-select';

type FormRender =
  | 'TextInput'
  | 'CheckBoxInput'
  | 'SelectInput'
  | 'MultiSelectInput';

const FieldRenderMap = {
  TextInput: TextInput,
  CheckBoxInput: CheckBoxInput,
  SelectInput: Select,
  MultiSelectInput: MultiSelectInput,
};

export interface FormConfigField {
  id: string;
  label: string;
  placeholder: string;
  render: FormRender;
  selectConfig?: any;
}

export interface EditItemFormConfig {
  backUrl: string;
  title: string;
  api: RestModelApi;
  fields: any[];
  serialize: (data: any) => any;
  submitLabel: string;
  defaultState: () => any;
}

const EditItemForm = ({
  item,
  formConfig,
}: {
  item: any;
  formConfig: EditItemFormConfig;
}) => {
  const history = useHistory();
  const { showNotification } = useNotificationsContext();
  const formMethods = useForm({ defaultValues: item });

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = formMethods;

  const onFormSubmit = useCallback((data) => {
    return formConfig.api
      .patchItem(data.id, formConfig.serialize(data))
      .then((response: any) => {
        showNotification(
          { title: 'Успех', content: 'Обновление прошло успешно' },
          null
        );

        const { action } = history;
        if (action === 'PUSH') {
          history.goBack();
        } else {
          history.push(formConfig.backUrl);
        }
      });
  }, []);
  return (
    <div className="p-20">
      <h1 className="pb-10 text-2xl">{formConfig.title}</h1>
      <form className="grid grid-cols-6" onSubmit={handleSubmit(onFormSubmit)}>
        <FormProvider {...formMethods}>
          <div className="col-span-4">
            {formConfig.fields.map((field: FormConfigField) => {
              const FieldRenderComponent = FieldRenderMap[field.render];
              return (
                <FieldRenderComponent
                  field={field}
                  register={register}
                  key={field.id}
                  value={item[field.id]}
                />
              );
            })}
            <div className="form-buttons">
              <Button title={formConfig.submitLabel} />
            </div>
          </div>
        </FormProvider>
      </form>
    </div>
  );
};

const EditItem = ({
  id,
  formConfig,
}: {
  id: string;
  formConfig: EditItemFormConfig;
}) => {
  const [item, setItem] = useState(formConfig.defaultState());

  useEffect(() => {
    formConfig.api.getItem(id).then((response: any) => {
      setItem({ isLoaded: true, data: serializeToCamel(response.data) });
    });
  }, [id]);

  return item.isLoaded ? (
    <EditItemForm item={item.data} formConfig={formConfig} />
  ) : null;
};

export default EditItem;
