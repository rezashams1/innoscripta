import { type HttpErrorType, type HttpResponseType } from './../api'
import { Api } from '../api'

export const UserService = {
  setPreferences: async (
    params: {
      sources: number[],
      authors: number[],
    },
    makeAlert: any
  ): Promise<HttpResponseType<any>> =>
    await new Promise((resolve, reject) => {
      const api = new Api()

      api.instance
        .post(api.route('set preferences'), params)
        .then((response: any) => {
          resolve(response)
        })
        .catch((error: HttpErrorType) => {
          reject(error)
          api.handleErrorsAsAlert(error, makeAlert)
        })
    }),
}
