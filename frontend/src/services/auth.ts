import Cookie from 'js-cookie';

export const setAccessToken = (token: string) => {
  Cookie.set('Access-Token', token);
};

export const clearAccessToken = () => {
  Cookie.remove('Access-Token');
}

export const getAccessToken = () => Cookie.get('Access-Token') || '';
