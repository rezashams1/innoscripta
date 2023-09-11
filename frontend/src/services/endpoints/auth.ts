import { User } from '../../interfaces/user';
import { Api, type HttpResponseType } from '../api';

export const AuthService = {
  login: async (
    params: {
      email: string;
      password: string;
    },
    setError: any,
    makeAlert: any
  ): Promise<HttpResponseType<{ user: User, accessToken: string, tokenType: string }>> =>
    await new Promise((resolve, reject) => {
      const api = new Api();

      api.instance
        .post(api.route('login'), params)
        .then((response: any) => {
          resolve(response);
        })
        .catch((error: any) => {
          reject(error);
          api.handleErrors(error, setError, makeAlert);
        });
    }),

  register: async (
    params: {
      email: string;
      password: string;
      name: string;
    },
    setError: any,
    makeAlert: any
  ): Promise<HttpResponseType<{ user: User, accessToken: string, tokenType: string }>> =>
    await new Promise((resolve, reject) => {
      const api = new Api();

      api.instance
        .post(api.route('register'), params)
        .then((response: any) => {
          resolve(response);
        })
        .catch((error: any) => {
          reject(error);
          api.handleErrors(error, setError, makeAlert);
        });
    }),

  check: async (): Promise<HttpResponseType<any>> =>
    await new Promise((resolve, reject) => {
      const api = new Api();

      api.instance
        .get(api.route('auth'))
        .then((response: any) => {
          resolve(response);
        })
        .catch((error: any) => {
          reject(error);
        });
    }),

  logout: async (): Promise<HttpResponseType<any>> =>
    await new Promise((resolve, reject) => {
      const api = new Api();

      api.instance
        .get(api.route('logout'))
        .then((response: any) => {
          resolve(response);
        })
        .catch((error: any) => {
          reject(error);
        });
    })
};
