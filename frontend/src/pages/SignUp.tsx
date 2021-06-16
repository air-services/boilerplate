import React, { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import accountApi from '../services/account';
import { validateEmail } from '../services/validators';
import i18n from '../services/translate';
import classNames from 'classnames';

const validateSignUpEmail = (email: string) => {
  if (!validateEmail(email)) {
    return 'EMAIL_WRONG_FORMAT';
  }

  return true;
};

const SignUpPage = () => {
  const { handleSubmit, register, formState, setError } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onFormSubmit = useCallback((values) => {
    accountApi
      .signUp(values)
      .then((response) => {
        console.log('success', response);
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
          <h1 className="text-center pb-10 text-2xl">SignUp</h1>
          <fieldset>
            <div className="mb-8">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password">
                Email
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
                placeholder="Email"
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
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
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
              className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit">
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
