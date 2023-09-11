import axios from 'axios'
import cookie from 'js-cookie'

export class HttpClient {
  instance: any

  constructor (baseURL: string | undefined) {
    this.instance = axios.create({
      baseURL,
      withCredentials: true
    })

    this.instance.interceptors.request.use(
      (config: { headers: { Authorization: string, lang: string } }) => {
        const token = cookie.get('auth')

        if (token !== undefined) {
          config.headers.Authorization = 'Bearer ' + String(token)
        }

        return config
      },
      async (error: any) => {
        return await Promise.reject(error)
      }
    )

    this._initializeResponseInterceptor()
  }

  _initializeResponseInterceptor = () => {
    this.instance.interceptors.response.use(
      this._handleResponse,
      this._handleError
    )
  }

  _handleResponse = (res: { data: any }) => res.data

  _handleError = async (error: any) => await Promise.reject(error)
}
