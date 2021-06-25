import React, { useEffect, useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import usersApi from 'services/api/users';
import { UserEditModel, UserEditDataModel } from 'modules/users/usersModels';

import TextInput from 'components/form/TextInput/TextInput';
import CheckBoxInput from 'components/form/CheckboxInput/CheckBoxInput';
import Button from 'components/ui/Button';
import {
  excludeKeys,
  serializeToCamel,
  serializeToSnake,
} from 'services/api/serializers';
import { useNotificationsContext } from '../../../providers/NotificationsContextProvider';

type FormID =
  | 'id'
  | 'email'
  | 'firstName'
  | 'lastName'
  | 'patronymic'
  | 'isActive';

type FormRender = 'TextInput' | 'CheckBoxInput';

const FieldRenderMap = {
  TextInput: TextInput,
  CheckBoxInput: CheckBoxInput,
};

interface FormConfigField {
  id: FormID;
  label: string;
  placeholder: string;
  render: FormRender;
}

class FormConfig {
  title = 'Редактирование профиля';
  submitLabel = 'Обновить';
  fields: FormConfigField[] = [
    {
      id: 'email',
      label: 'Электронная почта',
      placeholder: 'Электронная почта',
      render: 'TextInput',
    },
    { id: 'firstName', label: 'Имя', placeholder: 'Имя', render: 'TextInput' },
    {
      id: 'lastName',
      label: 'Фамилия',
      placeholder: 'Фамилия',
      render: 'TextInput',
    },
    {
      id: 'patronymic',
      label: 'Отчество',
      placeholder: 'Отчество',
      render: 'TextInput',
    },
    {
      id: 'isActive',
      label: 'Активный',
      placeholder: 'Активный',
      render: 'CheckBoxInput',
    },
  ];

  defaultState = () => ({
    isLoaded: false,
    data: {
      id: null,
      email: '',
      firstName: '',
      lastName: '',
      patronymic: '',
      isActive: false,
    },
  });

  serialize = (data: any) => {
    return serializeToSnake(excludeKeys('id')(data));
  };
}

const formConfig = new FormConfig();

const UserEditForm = ({ user }: { user: UserEditDataModel }) => {
  const { showNotification } = useNotificationsContext();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({ defaultValues: user });
  const onFormSubmit = useCallback((data) => {
    return usersApi
      .patchItem(data.id, formConfig.serialize(data))
      .then((response) => {
        // useNotificationsContext()
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

const UserEdit = ({ id }: { id: string }) => {
  const [user, setUser] = useState(formConfig.defaultState());

  useEffect(() => {
    usersApi.getItem(id).then((response) => {
      setUser({ isLoaded: true, data: serializeToCamel(response.data) });
    });
  }, [id]);

  return user.isLoaded ? <UserEditForm user={user.data} /> : null;
};

export default UserEdit;
