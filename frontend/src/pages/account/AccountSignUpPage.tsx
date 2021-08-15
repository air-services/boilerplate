import React, { useCallback } from 'react';
import classNames from 'classnames';
import { useForm } from 'react-hook-form';

import { useHistory } from 'react-router-dom';

import { validateEmail } from 'services/validators';
import { setAccessToken } from 'services/auth';
import accountApi from 'services/api/account';
import i18n from 'services/translate';

import { useAppContext } from 'providers/AppContextProvider';
import { useNotificationsContext } from 'providers/NotificationsContextProvider';

const validateSignUpEmail = (email: string) => {
  if (!validateEmail(email)) {
    return 'EMAIL_WRONG_FORMAT';
  }

  return true;
};

const SignUpLocales = {
  EMAIL_ALREADY_EXIST: 'signUp.EMAIL_ALREADY_EXIST',
  EMAIL_WRONG_FORMAT: 'signUp.EMAIL_WRONG_FORMAT',
  PASSWORD_REQUIRED: 'signUp.PASSWORD_REQUIRED',
  PASSWORD_SMALLER_8_SYMBOLS: 'signUp.PASSWORD_SMALLER_8_SYMBOLS',
  SUBMIT_BUTTON: 'signUp.SUBMIT_BUTTON',
  PASSWORD_FIELD_LABEL: 'signUp.PASSWORD_FIELD_LABEL',
  EMAIL_FIELD_LABEL: 'signUp.EMAIL_FIELD_LABEL',
  SIGNUP_SUCCESS_CONTENT: 'signUp.SIGNUP_SUCCESS_CONTENT',
  SIGNUP_SUCCESS_TITLE: 'signUp.SIGNUP_SUCCESS_TITLE',
  SIGNUP_FORM_LABEL: 'signUp.SIGNUP_FORM_LABEL',
};

const SignUpPage = () => {
  const { showNotification } = useNotificationsContext();
  const { handleSubmit, register, formState, setError } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const history = useHistory();
  const { loadAccount } = useAppContext();

  const onFormSubmit = useCallback((values) => {
    return accountApi
      .signUp(values)
      .then(({ data }) => {
        setAccessToken(data.token);
        loadAccount(() => {
          showNotification(
            {
              title: i18n.t(SignUpLocales.SIGNUP_SUCCESS_TITLE),
              content: i18n.t(SignUpLocales.SIGNUP_SUCCESS_CONTENT),
            },
            () => {
              history.push('/');
            }
          );
        });
      })
      .catch((error) => {
        const formErrors = error.response.data.detail;

        Object.keys(formErrors).forEach((field: any) => {
          setError(field, { message: formErrors[field] });
        });
      });
  }, []);

  return (
    <div className="grid grid-cols-6 gap-4">
      <div className="col-start-3 col-span-2 my-36">
        <form
          className="form bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          onSubmit={handleSubmit(onFormSubmit)}>
          <h1 className="text-center pb-10 text-2xl">
            {i18n.t(SignUpLocales.SIGNUP_FORM_LABEL)}
          </h1>
          <fieldset>
            <div className="mb-8">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password">
                {i18n.t(SignUpLocales.EMAIL_FIELD_LABEL)}
              </label>
              <input
                {...register('email', { validate: validateSignUpEmail })}
                className={classNames(
                  'shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline',
                  {
                    ['border-2 border-red-600']: formState.errors.email,
                  }
                )}
                type="email"
                placeholder={i18n.t(SignUpLocales.EMAIL_FIELD_LABEL)}
              />
              {formState.errors.email && (
                <p className="text-red-500 text-xs italic absolute">
                  {i18n.t(`signUp.${formState.errors.email.message}`)}
                </p>
              )}
            </div>
          </fieldset>
          <fieldset className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password">
              {i18n.t(SignUpLocales.PASSWORD_FIELD_LABEL)}
            </label>
            <input
              className="shadow
              appearance-none
              border
              rounded
              w-full
              py-2
              px-3
              text-gray-700
              mb-3
              leading-tight
              focus:outline-none
              focus:shadow-outline"
              id="password"
              autoComplete="on"
              type="password"
              placeholder="******************"
              {...register('password', { required: true, minLength: 8 })}
            />
            {formState.errors.password &&
              formState.errors.password.type === 'required' && (
                <p className="text-red-500 text-xs italic">
                  {i18n.t('signUp.PASSWORD_REQUIRED')}
                </p>
              )}

            {formState.errors.password &&
              formState.errors.password.type === 'minLength' && (
                <p className="text-red-500 text-xs italic">
                  {i18n.t('signUp.PASSWORD_SMALLER_8_SYMBOLS')}
                </p>
              )}
          </fieldset>

          <div className="flex items-center justify-between">
            <button
              className={classNames(
                `
                w-full
                bg-blue-500
                text-white
                font-bold
                py-2
                px-4
                rounded
                focus:outline-none
                focus:shadow-outline
                disabled:opacity-50
                disabled:cursor-auto
              `,
                { ['hover:bg-blue-700']: !formState.isSubmitting }
              )}
              disabled={formState.isSubmitting}
              type="submit">
              <div className="flex justify-center">
                <span>{i18n.t('signUp.SUBMIT_BUTTON')}</span>
              </div>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
