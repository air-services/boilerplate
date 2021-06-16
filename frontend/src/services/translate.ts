import i18n from 'i18next';

i18n.init({
  lng: 'ru',
  resources: {
    ru: {
      translation: {
        signUp: {
          EMAIL_ALREADY_EXIST: 'Такой email уже существует',
          EMAIL_WRONG_FORMAT: 'Неверный формат email',
          PASSWORD_REQUIRED: 'Необходимо ввести пароль',
          PASSWORD_SMALLER_8_SYMBOLS: 'Пароль должен быть не менее 8 символов',
        },
      },
    },
  },
});

export default i18n;
